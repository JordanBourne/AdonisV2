import { useSelector } from 'react-redux';
import { uniq, groupBy, orderBy, last, first, findLast, flatten } from 'lodash';
import { selectSetsForDay } from '../Sets/selectors';
import { selectNextDay, selectProgramRegistration } from '../ProgramRegistrations/selectors';
import { store } from '../store';
import { SetDb } from '../Sets/types';
import { SetHasUnsavedChangesActionFn, SetIsFetchedActionFn } from '../Sets/action-symbols';
import { selectAllModifiedSetIds, selectSet } from '../Sets/selectors';
import { batchAndSaveSetsToDb } from '../Sets/dynamo';
import { selectMyProfile } from '../Profile/selectors';
import { setMyProfile } from '../Profile/actions';
import { ProfileDb } from '../Profile/types';
import { selectAutoregulationScheme } from '../AutoregulationSchemes/selectors';
import { selectAllOrmsByMovement } from '../Orms/selectors';
import { batchAndSaveOneRepMaxesToDb } from '../Orms/actions';
import { ExtraSetsAdjustOrm } from '../AutoregulationSchemes/types';
import { calcWeight } from './util';
import * as uuid from 'uuid';
export const addRep = async (set? : SetDb) => {
    if (!set) return;
    if (!set.repsCompleted) {
        set.repsCompleted = set.repsExpected;
    }
    set.repsCompleted++;
    await batchAndSaveSetsToDb([ set ]);
};
export const minusRep = async (set? : SetDb) => {
    if (!set) return;
    if (!set.repsCompleted) {
        set.repsCompleted = set.repsExpected;
    }
    set.repsCompleted--;
    await batchAndSaveSetsToDb([ set ]);
};
export const completeWorkout = async (week: number, day: number) => {
    const profile = selectMyProfile(store.getState());
    const sets = orderBy(selectSetsForDay({ week, day, programRegistrationId: profile?.programRegistrationId as string })(store.getState()), ['week', 'day', 'index']);
    const setsByMovement = groupBy(sets, 'movement');
    const ormsByMovement = selectAllOrmsByMovement(store.getState());
    sets.forEach(set => {
        set.weightLifted = calcWeight(ormsByMovement[set.movement], set);
    });
    await batchAndSaveSetsToDb(sets);
    const { week: nextWeek, day: nextDay } = selectNextDay(profile?.programRegistrationId as string, profile?.week as number, profile?.day as number )(store.getState());
    await setMyProfile({
        ...profile,
        week: nextWeek ? nextWeek : null,
        day: nextDay ? nextDay : null,
    } as ProfileDb);
    const autoregulationScheme = selectAutoregulationScheme(profile?.autoregulationSchemeId as string)(store.getState());
    const movementsWithDuplicates = sets.map(s => s.movement);
    const uniqueMovements : string[] = uniq(movementsWithDuplicates);
    const newOrms = uniqueMovements.map(movement => {
        const orm = ormsByMovement[movement];
        const relatedSets = setsByMovement[movement];
        if (autoregulationScheme.type === 'EXTRA_SETS_ADJUST_ORM') {
            const extraSetsAdjustOrmScheme = autoregulationScheme as ExtraSetsAdjustOrm;
            const autoreg = extraSetsAdjustOrmScheme.movements[movement] ?? extraSetsAdjustOrmScheme.movements['default'];
            let missedASet = false;
            for (const set of relatedSets.slice(0, relatedSets.length - 1)) {
                if (set.repsCompleted === null || set.repsCompleted < set.repsExpected) {
                    missedASet = true;
                    break;
                }
            }
            let adjustmentToApply = first(autoreg.adjustments);
            if (!missedASet) {
                const lastSet = last(relatedSets) as SetDb;
                const delta = lastSet.repsCompleted as number - lastSet.repsExpected as number;
                adjustmentToApply = findLast(autoreg.adjustments, a => a.extraSets <= delta);
            }
            orm.calcOrm *= adjustmentToApply?.ormAdjustment as number;
        }
        return orm;
    });
    const newOrmsWithNewIds = flatten(newOrms.map(ormDb => {
        const createdAtIso = new Date().toISOString();
        return [
            { 
                ...ormDb,
                ormId: uuid.v4(),
                label: createdAtIso,
                createdAtIso,
                updatedAtIso: createdAtIso
            },
            {
                ...ormDb,
                label: 'latest',
                updatedAtIso: createdAtIso
            }
        ]
    }));
    batchAndSaveOneRepMaxesToDb(newOrmsWithNewIds);
};
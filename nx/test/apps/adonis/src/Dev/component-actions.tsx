import { fetchAllOrms, updateOrmLabel } from '../Orms/actions';
import { OrmDb } from '../Orms/types';
import { groupBy, maxBy } from 'lodash';
export const latestOrmMigration = async () => {
    const allOrms = await fetchAllOrms();
    const ormsByGroup = groupBy(allOrms, 'movement');
    await Promise.all(Object.keys(ormsByGroup).map(async(movement) => {
        const orms = ormsByGroup[movement];
        console.log(orms);
        const latestOrm = maxBy(orms, 'createdAtIso') as OrmDb;
        console.log(latestOrm);
        
        await Promise.all(orms.map((ormDb) => updateOrmLabel(ormDb, ormDb.createdAtIso)));

        await updateOrmLabel(latestOrm, 'latest');
    }));
};
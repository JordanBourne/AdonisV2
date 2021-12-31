import React, { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Container, CssBaseline, Box, Avatar, Typography, Card, CardContent, Button, CardActions } from '@mui/material';
import { BallotOutlined } from '@mui/icons-material';
import { SetButton } from '../Sets/component';
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import { groupBy, uniq, orderBy, last } from 'lodash';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
import { selectMyProfile } from '../Profile/selectors';
import { useSearchParams } from 'react-router-dom';
import { selectSetsForDay } from '../Sets/selectors';
import { fetchSetsForDay } from '../Sets/dynamo';
import { selectProgram } from '../Programs/selectors';
import { selectAllOrmsByMovement } from '../Orms/selectors';
import { selectProgramRegistration } from '../ProgramRegistrations/selectors';
import { SetDb } from '../Sets/types';
import { OrmDb } from '../Orms/types';
import { styles } from './styles';
import { calcWeight } from './util';

import { NeedToRegisterForProgram } from './need-to-register-for-program';
import { NeedToSignIn } from './need-to-sign-in';
import { addRep, minusRep, completeWorkout } from './component-actions';

export const Workout = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const profile = useSelector(selectMyProfile);
    const week: number = (searchParams.get("week") ? Number(searchParams.get("week")) : null) ?? profile?.week ?? 1;
    const day: number = (searchParams.get("day") ? Number(searchParams.get("day")) : null) ?? profile?.day ?? 1;
    const programRegistrationId: string | null = searchParams.get("programRegistrationId") ?? profile?.programRegistrationId ?? profile?.programRegistrationId ?? null;
    const sets = orderBy(useSelector(selectSetsForDay({ week, day, programRegistrationId })), ['week', 'day', 'index']);
    const setsByMovement: { [key: string]: SetDb[] } = groupBy(sets, 'movement') as { [key: string]: SetDb[] };
    const movements: string[] = uniq(sets.map(s => s.movement));
    const program = useSelector(selectProgram(profile?.programId));
    const ormsByMovement = useSelector(selectAllOrmsByMovement);
    const programRegistration = useSelector(selectProgramRegistration(programRegistrationId as string));
    const ormsBySetId: { [key: string]: OrmDb } = {};
    for (const set of sets) {
        ormsBySetId[set.setId] = ormsByMovement[set.movement];
    }

    useEffect(() => {
        if (programRegistrationId && week && day) {
            fetchSetsForDay({
                programRegistrationId: programRegistrationId as string,
                week: week as number,
                day: day as number,
            });
        }
    }, [day, week, programRegistrationId]);

    if (!programRegistrationId
        || !week
        || !day
        || !program
        || !programRegistration
        || !Object.keys(ormsByMovement).length) {
        return (<NeedToRegisterForProgram />);
    }

    if (!profile) {
        return (<NeedToSignIn />);
    }

    const goto = (week: string | number, day: string | number) => {
        navigate(`/workout?week=${week}&day=${day}`);
    };

    return (
        <Grid container sx={styles.page}>
            <Grid container sx={styles.contentContainer}>
                <Grid container sx={styles.workoutContainerTitle}>
                    <Typography sx={styles.workoutTitle}>Workout</Typography>
                    <Grid item sx={styles.dropdownContainer}>
                        <FormControl variant="standard" sx={styles.dayDropdown}>
                            <InputLabel id="week-select-label">Week</InputLabel>
                            <Select
                                labelId="week-select-label"
                                id="week-select"
                                value={week}
                                label="Week"
                                onChange={(event) => goto(event.target.value, day)}
                            >
                                {Object.keys(program.setScheme.weeks).map((weekNumber: string) => (
                                    <MenuItem key={weekNumber} value={weekNumber}>{weekNumber}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={styles.dayDropdown}>
                            <InputLabel id="day-select-label">Day</InputLabel>
                            <Select
                                labelId="day-select-label"
                                id="day-select"
                                value={day}
                                label="Day"
                                onChange={(event) => goto(week, event.target.value)}
                            >
                                {programRegistration.days
                                    .map((val: number) => {
                                        return (<MenuItem key={val} value={val}>{val}</MenuItem>);
                                    })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {movements.map((movement: string) => {
                    return (<Grid item container sx={styles.movementsContainer} key={movement}>
                        <Grid item>
                            <Typography sx={styles.movementName}>{titleCaseString(movement)}</Typography>
                            <Typography sx={styles.movementWeight}>{calcWeight(ormsByMovement[movement] as OrmDb, setsByMovement[movement][1] as SetDb) + ' lbs'}</Typography>
                            <Typography sx={styles.movementWeight}>.95 {calcWeight(ormsByMovement[movement] as OrmDb, setsByMovement[movement][0] as SetDb)}  lbs</Typography>
                        </Grid>
                        <Grid item sx={styles.setContainer}>
                            {setsByMovement[movement].map((set: SetDb) => (<SetButton key={set.setId} setId={set.setId} />))}
                            <Grid item key={`${movement}-add`} sx={styles.setRepButton} onClick={() => addRep(last(setsByMovement[movement]))}>+</Grid>
                            <Grid item key={`${movement}-minus`} sx={styles.setRepButton} onClick={() => minusRep(last(setsByMovement[movement]))}>-</Grid>
                        </Grid>
                    </Grid>);
                })}
                <button onClick={() => completeWorkout(week, day)}>complete workout placeholder button</button>
            </Grid>
        </Grid>
    )
};
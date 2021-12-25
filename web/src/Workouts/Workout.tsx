import React, { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Container, CssBaseline, Box, Avatar, Typography, Card, CardContent, Button, CardActions } from '@mui/material';
import { BallotOutlined } from '@mui/icons-material';
import { SetButton } from '../Sets/component';
import { useNavigate } from 'react-router';

// import { calculateNewTrainingMaxes, calculateUpdatedLifts, constructCompletedWorkout, getWorkoutForDay, validateWorkoutCompleted, workout } from '../util/workoutUtil';
import { useEffect } from 'react';
import { groupBy, uniq, orderBy } from 'lodash';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectMyProfile } from '../Profile/selectors';
import { workout } from '../util/workoutUtil';
import * as profileActions from '../Profile/actions';
import { Dispatch } from 'react';
import { ObjectEntries } from '../util/util';
import { useSearchParams } from 'react-router-dom';
import { selectSetsForDay } from '../Sets/selectors';
import { fetchSetsForDay } from '../Sets/dynamo';
import { selectProgram } from '../Programs/selectors';
import { selectAllOrmsByMovement } from '../Orms/selectors';
import { selectProgramRegistration } from '../ProgramRegistrations/selectors';
import { SetDb } from '../Sets/types';
import { OrmDb } from '../Orms/types';

const styles = {
    page: {
        padding: '20px'
    },
    contentContainer: {
        backgroundColor: 'white',
        border: '1px solid #BBB',
        margin: 'auto',
        maxWidth: '800px'
    },
    workoutContainerTitle: {
        borderBottom: '1px solid #4F4F4F',
        margin: '10px',
        color: '#4F4F4F',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    workoutTitle: {
        fontSize: '2em',
    },
    daySelector: {
        justifyContent: 'center',
        padding: '5px'
    },
    dayDropdown: {
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '5px'
    },
    dropdown: {
        backgroundColor: 'white'
    },
    dropdownContainer: {
    },
    movementsContainer: {
        justifyContent: 'space-between',
        padding: '10px'
    },
    movementName: {
        fontSize: '1.125em',
        padding: '0px',
        width: '100%',
        marginBottom: '-2px'
    },
    movementWeight: {
        fontSize: '1em',
        padding: '0px',
        width: '100%'
    },
    setCounter: {
        border: '1px solid #AAA',
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 5px 0 5px'
    },
    setRepButton: {
        border: '1px solid #AAA',
        height: '20px',
        width: '20px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 5px 0 5px'
    },
    setContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        cursor: 'pointer'
    },
    completedSet: {
        backgroundColor: '#0bdd0861'
    }
}

const NeedToRegisterForProgram = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <BallotOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Workout
                </Typography>
                <Box sx={{ mt: 1 }}>
                    You need to register for a program before you can view this page.
                </Box>
            </Box>
        </Container>
    );
};

const NeedToSignIn = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <BallotOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Workout
                </Typography>
                <Box sx={{ mt: 1 }}>
                    You need to sign in or sign up.
                </Box>
            </Box>
        </Container>
    );
};

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
        || !programRegistrationId) {
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
                                {Object.keys(program.daysPerWeek[programRegistration.daysPerWeek])
                                    .map((val: string) => {
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
                            <Typography sx={styles.movementWeight}>{Math.round(ormsByMovement[movement].calcOrm * setsByMovement[movement][0].percentOrm / 100) + ' lbs'}</Typography>
                        </Grid>
                        <Grid item sx={styles.setContainer}>
                            {setsByMovement[movement].map((set: SetDb) => (<SetButton setId={set.setId} />))}
                            {/* <Grid item key={`${set.setId}-add`} sx={styles.setRepButton} onClick={() => addRep(workout)}>+</Grid>
              <Grid item key={`${set.setId}-minus`} sx={styles.setRepButton} onClick={() => minusRep(workout)}>-</Grid> */}
                        </Grid>
                    </Grid>);
                })}
                {/* <button onClick={completeWorkout}>complete workout placeholder button</button> */}
            </Grid>
        </Grid>
    )
};
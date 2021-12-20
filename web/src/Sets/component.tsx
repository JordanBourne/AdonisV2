import { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { calculateNewTrainingMaxes, calculateUpdatedLifts, constructCompletedWorkout, getWorkoutForDay, validateWorkoutCompleted, workout } from '../util/workoutUtil';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectMyProfile } from '../Profile/selectors';
import * as profileActions from '../Profile/actions';
import { Dispatch } from 'react';
import { ObjectEntries } from '../util/util';
import { fetchSet } from './dynamo';
import { selectSet } from './selectors';

const styles = {
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
    completedSet: {
        backgroundColor: '#0bdd0861'
    }
}

type SetButtonProps = { workout: workout, week: number, day: number, index: number};

export const SetButton = (props : SetButtonProps) => {
    const set = useSelector(selectSet({ workoutName: props.workout.name, week: props.week, day: props.day, index: props.index }))

    useEffect(() => {
        fetchSet(
            props.workout.name,
            props.week,
            props.day,
            props.index
        )
    }, []);

    return (
        <Grid
            item
            key={`${props.workout.name} - set - ${props.index}`}
            sx={{ ...styles.setCounter, ...(set.repsCompleted !== null ? styles.completedSet : {}) }}
            onClick={() => updateSet(props.workout.name, props.index)}>
            {set.repsCompleted ?? set.repsExpected}
        </Grid>
    )
};
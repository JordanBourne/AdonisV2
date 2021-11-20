import { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { calculateNewTrainingMaxes, calculateUpdatedLifts, constructCompletedWorkout, getWorkoutForDay, validateWorkoutCompleted, workout } from '../util/workoutUtil';
import { useEffect } from 'react';
import { titleCaseString } from '../util/textUtil';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCurrentUser, profileActions } from '../slices/profile';
import { Dispatch } from 'react';

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

export const Workout = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const [week, setWeek]: [number, Dispatch<SetStateAction<number>>] = useState(currentUser ? currentUser.programSettings.week : 1);
  const [day, setDay]: [number, Dispatch<SetStateAction<number>>] = useState(currentUser ? currentUser.programSettings.day : 1);
  const [currentWorkout, setCurrentWorkout]: [workout[] | undefined,  Function] = useState();
  const [completedSets, setCompletedSets]: [{[key: string]: number[]}, Function] = useState({});
  const [lastSetReps, setLastSetReps]: [{[key: string]: number}, Dispatch<SetStateAction<{[key: number]: number}>>] = useState({});

  useEffect(() => {
    if (currentUser) setCurrentWorkout(getWorkoutForDay(week, day, currentUser));
  }, [week, day, currentUser]);

  useEffect(() => {
    if (currentWorkout) {
      const defaultLastSets: {[key: string]: number} = {};
      currentWorkout.forEach((workout: workout) => {
        defaultLastSets[workout.name] = workout.sets[workout.sets.length - 1];
      });

      setLastSetReps(defaultLastSets);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkout]);

  useEffect(() => {
    // TODO: check profile for if today is already a completed workout
  });

  const updateSet = (movement: string, setNumber: number) => {
    if (!completedSets[movement]) {
      completedSets[movement] = [setNumber];
    } else if (!completedSets[movement].includes(setNumber)) {
      completedSets[movement].push(setNumber);
    } else {
      completedSets[movement] = completedSets[movement].filter((val: number) => val !== setNumber);
    }
    
    setCompletedSets({...completedSets});
  };

  const addRep = (workout: workout) => {
    if (lastSetReps[workout.name]) {
      setLastSetReps({...lastSetReps, [workout.name]: lastSetReps[workout.name] + 1});
    } else {
      setLastSetReps({...lastSetReps, [workout.name]: workout.sets[workout.sets.length - 1] + 1});
    }
  };

  const minusRep = (workout: workout) => {
    if (lastSetReps[workout.name]) {
      setLastSetReps({...lastSetReps, [workout.name]: lastSetReps[workout.name] - 1});
    } else {
      setLastSetReps({...lastSetReps, [workout.name]: workout.sets[workout.sets.length - 1] - 1});
    }
  };

  const completeWorkout = () => {
    const workoutCompleted: boolean = validateWorkoutCompleted(completedSets, currentWorkout);
    if (!workoutCompleted || !currentWorkout) {
    } else {
      const completedWorkout = constructCompletedWorkout(week, day, currentWorkout, lastSetReps);
      const newTrainingMaxes = calculateNewTrainingMaxes(currentUser, currentWorkout, lastSetReps);
      const updatedLifts = calculateUpdatedLifts(currentWorkout, lastSetReps);
      dispatch(profileActions.completeWorkout(completedWorkout, newTrainingMaxes, updatedLifts));
    }
    
  }

  if (!currentUser) return <div>Error, no current user</div>;

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
                onChange={(event) => setWeek(+event.target.value)}
              >
                {Object.keys(currentUser.program.setScheme.weeks).map((weekNumber: string) => (
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
                onChange={(event) => setDay(+event.target.value)}
              >
                {Array.from(Array(currentUser.programSettings.daysPerWeek).keys())
                  .map((val: number) => (
                    <MenuItem key={val} value={val + 1}>{val + 1}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {currentWorkout && currentWorkout.map((workout: workout, workoutIndex: number) => (
          <Grid item container sx={styles.movementsContainer} key={workout.name}>
            <Grid item>
              <Typography sx={styles.movementName}>{titleCaseString(workout.name)}</Typography>
              <Typography sx={styles.movementWeight}>{workout.weight + ' lbs'}</Typography>
            </Grid>
            <Grid item sx={styles.setContainer}>
              {workout.sets.map((set: number, index: number) => {
                const completed = completedSets[workout.name] && completedSets[workout.name].includes(index);
                const repCount = index === workout.sets.length - 1 ? 
                  (lastSetReps[workout.name] ? lastSetReps[workout.name] : set) :
                  set;
                return (
                  <Grid item key={`${workout.name} - set - ${index}`} sx={{...styles.setCounter, ...(completed ? styles.completedSet : {})}} onClick={() => updateSet(workout.name, index)}>{repCount}</Grid>
                )
              })}
              <Grid item key={`${workout.name}-add`} sx={styles.setRepButton} onClick={() => addRep(workout)}>+</Grid>
              <Grid item key={`${workout.name}-minus`} sx={styles.setRepButton} onClick={() => minusRep(workout)}>-</Grid>
            </Grid>
          </Grid>
          )
        )}
        <button onClick={completeWorkout}>complete workout placeholder button</button>
      </Grid>
    </Grid>
  )
};
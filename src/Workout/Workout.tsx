import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { myProfile } from '../profile';
import { getCurrentWorkout, getWorkoutForDay, workout } from '../util/workoutUtil';
import { useEffect } from 'react';
import { titleCaseString } from '../util/textUtil';
import { NumberLiteralType } from 'typescript';

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
  setContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer'
  },
  completedSet: {
    backgroundColor: '#0bdd0861'
  }
}

export const Workout = () => {
  const [week, setWeek]: [string | number, Function] = useState(myProfile.programSettings.week);
  const [day, setDay]: [string | number, Function] = useState(myProfile.programSettings.day);
  const [currentWorkout, setCurrentWorkout]: [workout[] | undefined,  Function] = useState();
  const [completedSets, setCompletedSets]: [{[key: string]: number[]}, Function] = useState({});

  useEffect(() => {
    setCurrentWorkout(getWorkoutForDay(week, day, myProfile));
  }, [week, day])

  const updateSet = (movement: string, setNumber: number) => {
    if (!completedSets[movement]) {
      completedSets[movement] = [setNumber];
    } else if (!completedSets[movement].includes(setNumber)) {
      completedSets[movement].push(setNumber);
    } else {
      completedSets[movement] = completedSets[movement].filter((val: number) => val !== setNumber);
    }
    
    setCompletedSets({...completedSets});
  }

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
                onChange={(event) => setWeek(event.target.value)}
              >
                {Object.keys(myProfile.program.setScheme.weeks).map((weekNumber: string) => (
                  <MenuItem key={weekNumber} value={parseInt(weekNumber)}>{parseInt(weekNumber)}</MenuItem>
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
                onChange={(event) => setDay(event.target.value)}
              >
                {Array.from(Array(myProfile.programSettings.daysPerWeek).keys())
                  .map((val: number) => (
                    <MenuItem key={val} value={val + 1}>{val + 1}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {currentWorkout && currentWorkout.map((workout: workout) => (
          <Grid item container sx={styles.movementsContainer} key={workout.name}>
            <Grid item>
              <Typography sx={styles.movementName}>{titleCaseString(workout.name)}</Typography>
              <Typography sx={styles.movementWeight}>{workout.weight + ' lbs'}</Typography>
            </Grid>
            <Grid item sx={styles.setContainer}>
              {workout.sets.map((set: number, index: number) => {
                const completed = completedSets[workout.name] && completedSets[workout.name].includes(index);
                console.log('# Completed Sets #', completedSets);
                console.log('Set Completed 1? ', completedSets[workout.name])
                console.log('Set Completed 3? ', completed)
                return (
                  <Grid item sx={{...styles.setCounter, ...(completed ? styles.completedSet : {})}} onClick={() => updateSet(workout.name, index)}>{set}</Grid>
                )
              })}
            </Grid>
          </Grid>
          )
        )}
      </Grid>
    </Grid>
  )
};
import { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SetButton } from '../Sets/component';

// import { calculateNewTrainingMaxes, calculateUpdatedLifts, constructCompletedWorkout, getWorkoutForDay, validateWorkoutCompleted, workout } from '../util/workoutUtil';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectMyProfile } from '../Profile/selectors';
import { workout } from '../util/workoutUtil';
import * as profileActions from '../Profile/actions';
import { Dispatch } from 'react';
import { ObjectEntries } from '../util/util';

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
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useAppDispatch();
  // const [week, setWeek]: [number, Dispatch<SetStateAction<number>>] = useState(myProfile ? myProfile.programSettings.week : 1);
  // const [day, setDay]: [number, Dispatch<SetStateAction<number>>] = useState(myProfile ? myProfile.programSettings.day : 1);
  const [currentWorkout, setCurrentWorkout]: [workout[] | undefined,  Function] = useState();
  const [completedSets, setCompletedSets]: [{[key: string]: number[]}, Function] = useState({});
  const [lastSetReps, setLastSetReps]: [{[key: string]: number}, Dispatch<SetStateAction<{[key: number]: number}>>] = useState({});

  // useEffect(() => {
  //   if (myProfile) setCurrentWorkout(getWorkoutForDay(week, day, myProfile));
  // }, [week, day, myProfile]);

  // useEffect(() => {
  //   if (currentWorkout) {
  //     const defaultLastSets: {[key: string]: number} = {};
  //     currentWorkout.forEach((workout: workout) => {
  //       defaultLastSets[workout.name] = workout.sets[workout.sets.length - 1];
  //     });

  //     setLastSetReps(defaultLastSets);
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentWorkout]);

  // useEffect(() => {
  //   if (
  //     myProfile?.completedWorkouts?.[week]?.[day]
  //   ) {
  //     setCurrentWorkout(myProfile.completedWorkouts[week][day]);
  //     const completedWorkout: {[key: string]: number[]} = {};
  //     ObjectEntries(myProfile.completedWorkouts[week][day]).forEach(([_, workout]: [string, workout]) => {
  //       completedWorkout[workout.name] = Array.from(Array(workout.sets.length).keys());
  //     });
  //     console.log(completedWorkout);
  //     setCompletedSets(completedWorkout);
  //   }
  // }, [week, day, myProfile]);

  // const addRep = (workout: workout) => {
  //   if (lastSetReps[workout.name]) {
  //     setLastSetReps({...lastSetReps, [workout.name]: lastSetReps[workout.name] + 1});
  //   } else {
  //     setLastSetReps({...lastSetReps, [workout.name]: workout.sets[workout.sets.length - 1] + 1});
  //   }
  // };

  // const minusRep = (workout: workout) => {
  //   if (lastSetReps[workout.name]) {
  //     setLastSetReps({...lastSetReps, [workout.name]: lastSetReps[workout.name] - 1});
  //   } else {
  //     setLastSetReps({...lastSetReps, [workout.name]: workout.sets[workout.sets.length - 1] - 1});
  //   }
  // };

  // const completeWorkout = () => {
  //   const workoutCompleted: boolean = validateWorkoutCompleted(completedSets, currentWorkout);
  //   if (!workoutCompleted || !currentWorkout) {
  //   } else {
  //     const completedWorkout = constructCompletedWorkout(week, day, currentWorkout, lastSetReps);
  //     const newTrainingMaxes = calculateNewTrainingMaxes(myProfile, currentWorkout, lastSetReps);
  //     const updatedLifts = calculateUpdatedLifts(currentWorkout, lastSetReps);
  //     dispatch(profileActions.completeWorkout(completedWorkout, newTrainingMaxes, updatedLifts));
  //   }
  // }

  if (!myProfile) return <div>Error, no current user</div>;
  
  return <div>Page under construction</div>;

  // return (
    // <Grid container sx={styles.page}>
    //   <Grid container sx={styles.contentContainer}>
    //     <Grid container sx={styles.workoutContainerTitle}>
    //       <Typography sx={styles.workoutTitle}>Workout</Typography>
    //       <Grid item sx={styles.dropdownContainer}>
    //         <FormControl variant="standard" sx={styles.dayDropdown}>
    //           <InputLabel id="week-select-label">Week</InputLabel>
    //           <Select
    //             labelId="week-select-label"
    //             id="week-select"
    //             value={week}
    //             label="Week"
    //             onChange={(event) => setWeek(+event.target.value)}
    //           >
    //             {Object.keys(myProfile.program.setScheme.weeks).map((weekNumber: string) => (
    //               <MenuItem key={weekNumber} value={weekNumber}>{weekNumber}</MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //         <FormControl variant="standard" sx={styles.dayDropdown}>
    //           <InputLabel id="day-select-label">Day</InputLabel>
    //           <Select
    //             labelId="day-select-label"
    //             id="day-select"
    //             value={day}
    //             label="Day"
    //             onChange={(event) => setDay(+event.target.value)}
    //           >
    //             {Array.from(Array(myProfile.programSettings.daysPerWeek).keys())
    //               .map((val: number) => (
    //                 <MenuItem key={val} value={val + 1}>{val + 1}</MenuItem>
    //               )
    //             )}
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //     </Grid>
    //     {currentWorkout && currentWorkout.map((workout: workout, workoutIndex: number) => (
    //       <Grid item container sx={styles.movementsContainer} key={workout.name}>
    //         <Grid item>
    //           <Typography sx={styles.movementName}>{titleCaseString(workout.name)}</Typography>
    //           <Typography sx={styles.movementWeight}>{workout.weight + ' lbs'}</Typography>
    //         </Grid>
    //         <Grid item sx={styles.setContainer}>
    //           { workout.sets.map((set: number, index: number) => ( <SetButton setId={'asd'} /> ) ) }
    //           <Grid item key={`${workout.name}-add`} sx={styles.setRepButton} onClick={() => addRep(workout)}>+</Grid>
    //           <Grid item key={`${workout.name}-minus`} sx={styles.setRepButton} onClick={() => minusRep(workout)}>-</Grid>
    //         </Grid>
    //       </Grid>
    //       )
    //     )}
    //     <button onClick={completeWorkout}>complete workout placeholder button</button>
    //   </Grid>
    // </Grid>
  // )
};
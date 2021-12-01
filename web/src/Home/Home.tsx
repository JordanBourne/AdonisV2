import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
import { getCurrentWorkout, getLastWorkout, workout } from '../util/workoutUtil';
import { selectMyProfile } from '../Profile/selectors';

const styles = {
  backgroundStyle: {
    height: '100%',
    width: '100%'
  },
  boxStyle: {
    backgroundColor: '#EBEBEB',
    padding: '40px'
  },
  boxLeft: {
    paddingRight: '20px',
  },
  boxRight: {
    paddingLeft: '20px',
  },
  dashboardContent: {
    backgroundColor: '#FFF',
    border: '1px solid #BBB',
    height: '100%',
    paddingBottom: '20px'
  },
  dashboardBoxTitle: {
    borderBottom: '1px solid #4F4F4F',
    margin: '10px',
    fontSize: '1.5em',
    color: '#4F4F4F',
  },
  workoutPreviewContainer: {
    padding: '10px'
  },
  workoutTitle: {
    fontSize: '1.125em',
    padding: '0px',
    width: '100%',
    marginBottom: '-2px'
  },
  workoutWeight: {
    fontSize: '1em',
    padding: '0px',
    width: '100%'
  }
}

export const Home = () => {
  const myProfile = useSelector(selectMyProfile);
  console.log(myProfile);
  if (!myProfile) {
    return (<span>
      You need to log in before viewing this page
    </span>);
  }
  const todaysWorkout: workout[] = getCurrentWorkout(myProfile);
  const yesterdaysWorkout: workout[] = getLastWorkout(myProfile);

  return (
    <Grid container sx={styles.backgroundStyle}>
      <Grid item sx={{...styles.boxStyle, ...styles.boxLeft}} xs={12} sm={6}>
        <Grid sx={styles.dashboardContent}>
          <Typography variant="h2" sx={styles.dashboardBoxTitle}>Last Workout</Typography>
          {yesterdaysWorkout && yesterdaysWorkout.map((workout: workout) => (
            <Grid item container sx={styles.workoutPreviewContainer} key={workout.name}>
              <Typography sx={styles.workoutTitle}>{titleCaseString(workout.name)}</Typography>
              <Typography sx={styles.workoutWeight}>{workout.weight + ' lbs'}</Typography>
              {workout.sets.join(', ')}
            </Grid>
            )
          )}
        </Grid>
      </Grid>
      <Grid item sx={{...styles.boxStyle, ...styles.boxRight}} xs={12} sm={6}>
        <Grid sx={styles.dashboardContent}>
          <Typography variant="h2" sx={styles.dashboardBoxTitle}>Next Workout</Typography>
          {todaysWorkout && todaysWorkout.map((workout: workout) => (
            <Grid item container sx={styles.workoutPreviewContainer} key={workout.name}>
              <Typography sx={styles.workoutTitle}>{titleCaseString(workout.name)}</Typography>
              <Typography sx={styles.workoutWeight}>{workout.weight + ' lbs'}</Typography>
              {workout.sets.join(', ')}
            </Grid>
            )
          )}
        </Grid>
      </Grid>
      {/* <Grid sx={styles.boxStyle} xs={12} sm={6}>
        Starting Maxes
      </Grid>
      <Grid sx={styles.boxStyle} xs={12} sm={6}>
        Recent Maxes
      </Grid>
      <Grid sx={styles.boxStyle} xs={12} sm={6}>
        Peak Maxes
      </Grid>
      <Grid sx={styles.boxStyle} xs={12} sm={6}>
        Rate of Gains
      </Grid> */}
    </Grid>
  );
};
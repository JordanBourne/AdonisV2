import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { titleCaseString } from '../util/textUtil';
// import { getCurrentWorkout, getLastWorkout, workout } from '../util/workoutUtil';
import { selectMyProfile } from '../Profile/selectors';
import { fetchSetsForDay } from '../Sets/dynamo';
import { selectSetsForDay } from '../Sets/selectors';
import { SetDb } from '../Sets/types';
import { OrmDb } from '../Orms/types';
import { ProfileDb } from '../Profile/types';
import { selectAllOrmsByMovement } from '../Orms/selectors';
import { orderBy, uniq, groupBy, map } from 'lodash';
import { selectProgram } from '../Programs/selectors';
import { selectProgramRegistration } from '../ProgramRegistrations/selectors';
import { styles } from './styles';

const WorkoutSummary = ({ sets, profile, title }: { sets: SetDb[], profile: ProfileDb, title: string }) => {
  const setsByMovement: { [key: string]: SetDb[] } = groupBy(sets, 'movement') as { [key: string]: SetDb[] };
  const ormsByMovement = useSelector(selectAllOrmsByMovement);
  const ormsBySetId: { [key: string]: OrmDb } = {};
  for (const set of sets) {
    ormsBySetId[set.setId] = ormsByMovement[set.movement];
  }
  return (
    <Grid item sx={{ ...styles.boxStyle, ...styles.boxRight }} xs={12} sm={6}>
      <Grid sx={styles.dashboardContent}>
        <Typography variant="h2" sx={styles.dashboardBoxTitle}>{title}</Typography>
        {map(setsByMovement, (setsForMovement, movement) => {
          return (
            <Grid item container sx={styles.workoutPreviewContainer} key={movement}>
              <Typography sx={styles.workoutTitle}>{titleCaseString(movement)}</Typography>
              {map(groupBy(setsForMovement, 'percentOrm'), (setsForOrm, percentOrm : string) => {
                return map(groupBy(setsForOrm, 'repsExpected'), (similarSets, repsExpected : string) => {
                  return (
                    <Typography sx={styles.workoutWeight}>
                      {similarSets.length} x {repsExpected} x {Number(percentOrm) * ormsByMovement[movement]?.calcOrm}
                    </Typography>
                  );
                })
              })}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const profile = useSelector(selectMyProfile);
  const programRegistrationId: string | null = profile?.programRegistrationId ?? null;
  const week: number = profile?.week ?? 1;
  const day: number = profile?.day ?? 1;
  const setsToday = orderBy(useSelector(selectSetsForDay({ week, day, programRegistrationId })), ['week', 'day', 'index']);
  const program = useSelector(selectProgram(profile?.programId));
  const programRegistration = useSelector(selectProgramRegistration(programRegistrationId as string));
  let previousWeek, previousDay;

  useEffect(() => {
    if (programRegistrationId && week && day) {
      setLoading(true);
      fetchSetsForDay({
        programRegistrationId: programRegistrationId as string,
        week: week as number,
        day: day as number,
      }).then(() => setLoading(false));
    }
  }, [day, week, programRegistrationId]);

  if (loading) return (<span>loading</span>);

  if (!profile) {
    return (<span>
      You need to log in before viewing this page
    </span>);
  }

  return (
    <Grid container sx={styles.backgroundStyle}>
      <WorkoutSummary sets={setsToday} profile={profile} title='Next Workout' />
      <Grid item sx={{ ...styles.boxStyle, ...styles.boxLeft }} xs={12} sm={6}>
        <Grid sx={styles.dashboardContent}>
          <Typography variant="h2" sx={styles.dashboardBoxTitle}>Last Workout</Typography>
        </Grid>
      </Grid>
      <Grid sx={styles.boxStyle} xs={12} sm={6}>
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
      </Grid>
    </Grid>
  );
};
import { liftName, profile } from '../profile';
import { program, weightScheme } from '../workout';

export type workout = {
  weight: number;
  name: liftName;
  sets: number[];
}

export const roundWeight = (weight: number, profile: profile): number => {
  return Math.round((weight + 5 )/ 10) * 10 + 5;
}

export const getCurrentWorkout = (profile: profile): workout[] => {
  return getWorkoutForDay(profile.programSettings.week, profile.programSettings.day, profile);
};

export const getLastWorkout = (profile: profile): workout[] => {
  let week = profile.programSettings.week;
  let day = profile.programSettings.day;

  if (day === 1) {
    week -= 1;
  } else {
    day -= 1;
  }

  return getWorkoutForDay(week, day, profile);
}

export const getWorkoutForDay = (week: number, day: number, profile: profile): workout[] => {
  const weightScheme: weightScheme = profile.program.setScheme.weeks[week];
  // TODO: Add setting to profile page for days/week setting
  const todayLifts: string[] = profile.program.daysPerWeek[profile.programSettings.daysPerWeek][day];
  return todayLifts.map((lift: string) => {
    const liftType = lift.length === 2 ? 'primary' : 'auxiliary';
    
    const specificLift = profile.programSettings.lifts[lift];
    if (!specificLift) throw new Error(`No lift designated for: ${lift}`)

    const liftDetails = profile.lifts[specificLift]
    if (!liftDetails) throw new Error(`Lift not set up in profile: ${lift}`)

    return {
      weight: roundWeight(
        liftDetails[liftDetails.length - 1].weight * (weightScheme[liftType].percent / 100),
        profile
      ),
      name: specificLift,
      sets: weightScheme[liftType].sets
    };
  });
}
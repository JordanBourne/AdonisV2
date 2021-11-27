import { liftName, profile } from '../Profile/types';
import { lift, trainingMax, weightScheme } from '../workout';

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
  const todayLifts: string[] = profile.program.daysPerWeek[profile.programSettings.daysPerWeek][day];
  return todayLifts.map((lift: string) => {
    const liftType = lift.length === 2 ? 'primary' : 'auxiliary';
    
    const specificLift = profile.programSettings.lifts[lift];
    if (!specificLift) throw new Error(`No lift designated for: ${lift}`);

    const liftDetails = profile.trainingMaxes[specificLift];
    if (!liftDetails) throw new Error(`Lift not set up in profile: ${lift}`);

    return {
      weight: roundWeight(
        liftDetails[liftDetails.length - 1].weight * (weightScheme[liftType].percent / 100),
        profile
      ),
      name: specificLift,
      sets: weightScheme[liftType].sets
    };
  });
};

const calculateNextTrainingMaxDeltaPercentage = (targetReps: number, actualReps: number) : number => {
  const repDiff = actualReps - targetReps;
  switch (repDiff) {
    case 5:
      return 3;
    case 4:
      return 2;
    case 3:
      return 1.5;
    case 2:
      return 1;
    case 1:
      return 0.5;
    case 0:
      return 0;
    case -1:
      return -2;
    case -2:
      return -5;
    default:
      return repDiff > 0 ? 3 : -5;
  }
};

export const validateWorkoutCompleted = (completedSets: {[key: string]: number[]}, workout: workout[] | undefined): boolean => {
  if (!workout) return false;
  return workout.every(({sets, name}) => sets.length === (completedSets[name] && completedSets[name].length));
}

export const calculateNextTrainingMax = (workout: workout, weight: number, reps: number): number => {
  return weight * (1 + calculateNextTrainingMaxDeltaPercentage(workout.sets[workout.sets.length - 1], reps) / 100);
};

export const calculateOneRepMax = (workout: workout, reps: number): number => {
  return workout.weight * 12;
};

export const calculateUpdatedLifts = (workouts: workout[], lastSetReps: {[key: string]: number}): {[key:string]: lift}[] => {
  return workouts.map((workout: workout) => {
    return {
      [workout.name]: {
        date: new Date().toJSON(),
        estimatedWeight: calculateOneRepMax(workout, lastSetReps[workout.name]),
        weight: workout.weight,
        reps: lastSetReps[workout.name]
      }
    }
  });
};

export const calculateNewTrainingMaxes = (profile: profile, workouts: workout[], lastSetReps: {[key: string]: number}): {[key:string]: trainingMax}[] => {
  return workouts.map((workout: workout) => {
    const oldMaxes = profile.trainingMaxes[workout.name];
    if (!oldMaxes) return {};
    const mostRecentMax: trainingMax = oldMaxes.reduce((latestMax: trainingMax, nextMax: trainingMax) => {
      return latestMax.date > nextMax.date ? latestMax : nextMax;
    })

    return {
      [workout.name]: {
        date: new Date().toJSON(),
        weight: calculateNextTrainingMax(workout, mostRecentMax.weight, lastSetReps[workout.name])
      }
    }
  });
};

export const constructCompletedWorkout = (week: number, day: number, workouts: workout[], lastSetReps: {[key: string]: number}) => {
  const updatedWorkouts: workout[] = workouts.map((workout: workout): workout => {
    if (lastSetReps[workout.name]) {
      const completedReps = [];
      for (let i = 0; i < workout.sets.length - 1; i++) {
        completedReps.push(workout.sets[i]);
      }
      completedReps.push(lastSetReps[workout.name]);
      return {
        name: workout.name,
        weight: workout.weight,
        sets: completedReps
      };
    } else {
      return workout;
    }
  });
  return {
    [week]: {
      [day]: updatedWorkouts
    }
  }
};
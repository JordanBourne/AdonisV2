import { lift, program, SBS_RTF, trainingMax } from './workout';

export type liftName = 'bench press'
  | 'back squat'
  | 'deadlift'
  | 'overhead press'
  | 'front squat'
  | 'paused squat'
  | 'close grip bench press'
  | 'spoto press'
  | 'incline press'
  | 'sumo deadlift'
  | 'seated overhead press'
  | 'push press'
  | 'romanian deadlift'
  | 'block deadlift'

export interface roundingSettings {
  rounding: number;
  microPlates: boolean;
}

export interface completedWorkout {
  
}

export interface profile {
  lifts: {[key: string]: lift[]},
  completedWorkouts: {},
  program: program;
  programSettings: {
    lifts: {
      [key: string]: liftName;
    };
    week: number;
    day: number;
    daysPerWeek: number;
  }
  roundingSettings: roundingSettings;
  trainingMaxes: {
    [key in liftName]?: trainingMax[];
  };
}

export const myProfile: profile = {
  lifts: {},
  completedWorkouts: {},
  program: SBS_RTF,
  programSettings: {
    lifts: {
      p1: 'back squat',
      p2: 'bench press',
      p3: 'deadlift',
      p4: 'overhead press',
      p1a1: 'front squat',
      p1a2: 'paused squat',
      p2a1: 'close grip bench press',
      p2a2: 'spoto press',
      p3a1: 'block deadlift',
      p4a1: 'seated overhead press'
    },
    day: 3,
    week: 2,
    daysPerWeek: 4
  },
  roundingSettings: {
    rounding: 5,
    microPlates: false
  },
  trainingMaxes: {
    'bench press': [{
      weight: 225,
      date: new Date('2021/11/01').toJSON()
    }],
    'back squat': [{
      weight: 275,
      date: new Date('2021/11/01').toJSON()
    }],
    'overhead press': [{
      weight: 135,
      date: new Date('2021/11/01').toJSON()
    }],
    deadlift: [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'front squat': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'paused squat': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'close grip bench press': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'spoto press': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'block deadlift': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
    'seated overhead press': [{
      weight: 315,
      date: new Date('2021/11/01').toJSON()
    }],
  }
}
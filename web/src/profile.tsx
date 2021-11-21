import { program, SBS_RTF } from './workout';

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

export interface lift {
  weight: number;
  date: Date;
}

export interface profile {
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
  lifts: {
    [key in liftName]?: lift[];
  };
}

export const myProfile: profile = {
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
  lifts: {
    'bench press': [{
      weight: 225,
      date: new Date('2021/11/01')
    }],
    'back squat': [{
      weight: 275,
      date: new Date('2021/11/01')
    }],
    'overhead press': [{
      weight: 135,
      date: new Date('2021/11/01')
    }],
    deadlift: [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'front squat': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'paused squat': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'close grip bench press': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'spoto press': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'block deadlift': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
    'seated overhead press': [{
      weight: 315,
      date: new Date('2021/11/01')
    }],
  }
}
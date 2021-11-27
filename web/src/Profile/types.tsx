import { lift, program, SBS_RTF, trainingMax } from '../workout';
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
    lifts: { [key: string]: lift[] },
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
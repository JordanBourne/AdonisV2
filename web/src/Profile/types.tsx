import { String } from 'lodash';
import { lift, ProgramDto, trainingMax } from '../Programs/types';
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

export interface ProfileDb {
    programRegistrationId: string|null;
    autoregulationSchemeId: string|null;
    programId: string|null;
    week: number|null;
    day: number|null;
    roundingSettings: roundingSettings;
}
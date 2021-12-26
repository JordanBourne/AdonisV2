import { random } from 'lodash';
import { OrmDb } from './types';
import * as uuid from 'uuid';

export const ormMocks: OrmDb[] = ['Squat', 'Incline Press', 'Close Grip Bench Press', 'BENCH PRESS', 'Box Squat', 'Pistol Squats', 'OHP', 'Preacher Curls', 'DEADLIFT', 'Bent Row', 'LEG PRESS', 'Meadows Rows'].map(movement => ({
    cognitoIdentityId: 'COGNITO_IDENTITY_ID_MOCK',
    ormId: uuid.v4(),
    movement: movement,
    weight: random(100, 500),
    reps: 1,
    calcOrm: random(100, 500),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}));

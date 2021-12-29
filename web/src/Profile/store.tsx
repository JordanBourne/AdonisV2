import { lift, trainingMax } from '../Programs/types';
import type { ProfileDb, completedWorkout, liftName } from './types';
import { SetMyProfile, CompleteMyWorkout } from './action-symbols';
import { createAction } from '@reduxjs/toolkit'
import { ObjectEntries } from '../util/util';

interface MyProfileState {
  myProfile: ProfileDb | null;
};

const initialState: MyProfileState = {
  myProfile: null,
};

export const profileActions = {
  completeWorkout: createAction('profile/completeWorkout', (
    completedWorkout: completedWorkout,
    newTrainingMaxes: { [key: string]: trainingMax }[],
    updatedLifts: { [key: string]: lift }[]
  ) => {
    return {
      payload: {
        completedWorkout,
        newTrainingMaxes,
        updatedLifts
      }
    }
  }),
};

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case SetMyProfile:
      return {
        ...state,
        myProfile: {
          ...action.myProfile
        }
      };
    default:
      return state
  }
}
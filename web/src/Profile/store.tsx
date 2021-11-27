import { lift, program, SBS_RTF, trainingMax } from '../workout';
import type { profile, completedWorkout, liftName } from './types';
import { SetMyProfile, CompleteMyWorkout } from './action-symbols';
import { createAction } from '@reduxjs/toolkit'
import { ObjectEntries } from '../util/util';
import { myProfile } from '../profile';

interface MyProfileState {
  myProfile: profile | null;
};

const initialState: MyProfileState = {
  myProfile: myProfile,
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
        myProfile: action.myProfile
      };
    case CompleteMyWorkout:
      if (!state.myProfile) return state;
      const updatedLifts = JSON.parse(JSON.stringify(state.myProfile.lifts));
      action.payload.updatedLifts.forEach((liftObj: { [key in liftName]: lift }) => {
        const [name, lift] = Object.entries(liftObj)[0];
        if (updatedLifts[name]) {
          updatedLifts[name].push(lift);
        } else {
          updatedLifts[name] = [lift];
        }
      });

      const updatedMaxes = JSON.parse(JSON.stringify(state.myProfile.trainingMaxes));
      action.payload.newTrainingMaxes.forEach((newMaxObj: { [key in liftName]: trainingMax }) => {
        const [name, trainingMax]: [liftName, trainingMax] = ObjectEntries(newMaxObj)[0];
        const maxObj = updatedMaxes[name];
        if (maxObj) {
          maxObj.push(trainingMax);
        } else {
          updatedMaxes[name] = [trainingMax];
        }
      });

      const completedWorkouts = { ...state.myProfile.completedWorkouts, ...action.payload.completedWorkout };
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          lifts: updatedLifts,
          trainingMaxes: updatedMaxes,
          completedWorkouts: completedWorkouts
        }
      };
    default:
      return state
  }
}
import { createAction } from '@reduxjs/toolkit'
import { completedWorkout, liftName, myProfile, profile } from '../profile'
import type { RootState } from '../store'
import { ObjectEntries } from '../util/util';
import { lift, trainingMax } from '../workout';

// Define a type for the slice state
interface ProfileState {
  currentUser: profile
}

// Define the initial state using that type
const initialState: ProfileState = {
  currentUser: myProfile,
}

export const profileActions = {
  completeWorkout: createAction('profile/completeWorkout', (
    completedWorkout: completedWorkout,
    newTrainingMaxes: {[key:string]: trainingMax}[],
    updatedLifts: {[key:string]: lift}[]
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

// export const fetchProfile = (dispatch, getState) => {
//   client.get('todos').then(todos => {
//     dispatch({ type: 'todos/todosLoaded', payload: todos })
//   })
// }

export const getCurrentUser = (state: RootState) => state.profile.currentUser

export default function profileReducers(state = initialState, action: any) {
  switch (action.type) {
    case 'profile/completeWorkout':
      const updatedLifts = JSON.parse(JSON.stringify(state.currentUser.lifts));
      action.payload.updatedLifts.forEach((liftObj: {[key in liftName]: lift}) => {
        const [name, lift] = Object.entries(liftObj)[0];
        if (updatedLifts[name]) {
          updatedLifts[name].push(lift);
        } else {
          updatedLifts[name] = [lift];
        }
      });

      const updatedMaxes = JSON.parse(JSON.stringify(state.currentUser.trainingMaxes));
      action.payload.newTrainingMaxes.forEach((newMaxObj: {[key in liftName]: trainingMax}) => {
        const [name, trainingMax]: [liftName, trainingMax] = ObjectEntries(newMaxObj)[0];
        const maxObj = updatedMaxes[name];
        if (maxObj) {
          maxObj.push(trainingMax);
        } else {
          updatedMaxes[name] = [trainingMax];
        }
      });

      const completedWorkouts = {...state.currentUser.completedWorkouts, ...action.payload.completedWorkout};
      return {
        ...state, 
        currentUser: {
          ...state.currentUser,
          lifts: updatedLifts,
          trainingMaxes: updatedMaxes,
          completedWorkouts: completedWorkouts
        }
      };
    default:
      return state
  }
}
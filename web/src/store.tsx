import { combineReducers, applyMiddleware } from 'redux';
import { createStore } from '@reduxjs/toolkit';

import profile from './Profile/store';
import auth from './Auth/store';

const loggerMiddleware = (storeAPI : any) => (next : any) => (action : any) => {
  let result = next(action)
  console.groupCollapsed(action.type);
  console.log('dispatching', action)
  console.log('next state', storeAPI.getState())
  console.groupEnd();
  return result
}

const rootReducer = combineReducers({
  profile,
  auth
});


const middlewareEnhancer = applyMiddleware(loggerMiddleware)

export const store = createStore(rootReducer, middlewareEnhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
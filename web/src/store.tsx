import { configureStore } from '@reduxjs/toolkit'
import profile from './slices/profile';
import auth from './Auth/slice';

export const store = configureStore({
  reducer: {
    profile,
    auth
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
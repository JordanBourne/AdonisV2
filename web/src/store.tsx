import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './Profile/slice';

export default configureStore({
  reducer: {
    profile: profileReducer
  }
});
import type { RootState } from '../store';
import { ProfileDb } from './types';
export const selectMyProfile = (state: RootState) : ProfileDb | null => state.profile.myProfile || null; 
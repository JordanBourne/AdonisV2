import type { RootState } from '../store';
export const selectMyProfile = (state: RootState) => state.profile.myProfile;
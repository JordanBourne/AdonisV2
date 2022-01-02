import type { RootState } from '../store';
export const selectMyUsername = (state: RootState) => state.auth.userData?.username;
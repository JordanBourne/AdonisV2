import type { RootState } from '../store';
export const selectUsername = (state: RootState) => state.auth.userData?.username;
import type { RootState } from '../store';
export const getCurrentUsername = (state: RootState) => state.auth.username;
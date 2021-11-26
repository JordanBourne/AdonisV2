import type { RootState } from '../store';
export const getCurrentUsername = (state: RootState) => { console.log(state); return state.auth.username};
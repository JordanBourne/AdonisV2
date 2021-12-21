import type { RootState } from '../store';
export const selectSet = (setId: string) => (state: RootState) => state.sets[setId]
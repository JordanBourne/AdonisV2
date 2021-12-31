import { RootState } from '../store';
export const selectPercentComplete = (identifier: string) => (state: RootState) => {
    const progress = state.progress[identifier];
    if (!progress) {
        return null;
    }
    if (progress.thingsToDo === 0) {
        return null;
    }
    return progress.thingsDone as number / progress.thingsToDo as number;
};
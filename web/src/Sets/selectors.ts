import type { RootState } from '../store';
import { getSetSortKey } from './util';
interface selectSetProps {
    workoutName: string;
    week: number;
    day: number;
    index: number;
};
export const selectSet = (props: selectSetProps) => (state: RootState) => state.sets[getSetSortKey(props)]
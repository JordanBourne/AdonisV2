
interface selectSetProps {
    workoutName: string;
    week: number;
    day: number;
    index: number;
};
export const getSetSortKey = (props: selectSetProps) => {
    return `${props.workoutName}-${props.week}-${props.day}-${props.index}`;
};
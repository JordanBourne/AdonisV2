export interface SetDb {
    cognitoId: string;
    sortKey: string;
    workoutName: string;
    day: string;
    week: string;
    index: number;
    percentOrm: number;
    repsExpected: number;
    repsCompleted: number|null;
  };
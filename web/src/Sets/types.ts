export interface SetDb {
    cognitoIdentityId: string;
    setId: string;
    programId: string;
    programRegistrationId: string;
    programRegistrationIdWeekDay: string;
    movement: string;
    day: number;
    week: number;
    index: number;
    percentOrm: number;
    weightLifted: number|null;
    repsExpected: number;
    repsCompleted: number|null;
};

export interface ProfileDb {
  cognitoIdentityId: string;
  currentWorkoutId: string;
  week: number;
  day: number;
};
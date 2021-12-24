export interface SetDb {
    cognitoIdentityId: string;
    setId: string;
    programId: string;
    programRegistrationId: string;
    movement: string;
    day: number;
    week: number;
    index: number;
    percentOrm: number;
    repsExpected: number;
    repsCompleted: number|null;
};

export interface ProfileDb {
  cognitoIdentityId: string;
  currentWorkoutId: string;
  week: number;
  day: number;
};

export interface OrmDb {
  cognitoIdentityId: string;
  movement: string;
  weight: number;
  reps: number;
  calculatedOrm: number;
  setUniqueId: string;
}
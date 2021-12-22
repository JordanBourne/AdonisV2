export interface SetDb {
    cognitoId: string;
    uniqueId: string;
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
  cognitoId: string;
  currentWorkoutId: string;
  week: number;
  day: number;
};

export interface OrmDb {
  cognitoId: string;
  movement: string;
  weight: number;
  reps: number;
  calculatedOrm: number;
  setUniqueId: string;
}
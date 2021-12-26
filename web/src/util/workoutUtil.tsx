import { liftName, ProfileDb } from '../Profile/types';

export type workout = {
  weight: number;
  name: liftName;
  sets: number[];
}

export const roundWeight = (weight: number, profile: ProfileDb): number => {
  return Math.round((weight + 5 )/ 10) * 10 + 5;
}
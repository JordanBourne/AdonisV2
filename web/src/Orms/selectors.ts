import { OrmDb } from './types';
import { RootState } from '../store';
export const selectOrmByMovement = (movement : string) => (state : RootState) : OrmDb | null => state.orm.ormsByMovement[movement] ?? null;
export const selectAllOrmsByMovement = (state : RootState) : { [key: string]: OrmDb } => state.orm.ormsByMovement;
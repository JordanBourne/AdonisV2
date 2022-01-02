import { SetDb } from '../Sets/types';
import { OrmDb } from '../Orms/types';

export const calcWeight = (orm: OrmDb, set: SetDb) => {
    return Math.round(orm?.calcOrm * set?.percentOrm);
}
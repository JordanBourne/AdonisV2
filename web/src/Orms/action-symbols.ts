import { OrmDb } from './types';
export const OrmIsFetched = 'Orms/OrmIsFetched';
export const OrmIsFetchedActionFn = (ormDb : OrmDb) => {
    return {
        ormDb,
        type: OrmIsFetched
    };
};
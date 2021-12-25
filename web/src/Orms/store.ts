import { OrmIsFetched } from './action-symbols';
import { OrmDb } from './types';

interface OrmStoreState {
    ormsByMovement: { [key: string]: OrmDb };
};

const initialState: OrmStoreState = {
    ormsByMovement: {},
};

export default function authReducers(state = initialState, action: any) {
    switch (action.type) {
        case OrmIsFetched:
            const newOrmsByMovement = { ...state.ormsByMovement };
            const oldOrm = newOrmsByMovement[ action.ormDb.movement ];
            if (!oldOrm || action.ormDb.updatedAt >= oldOrm.updatedAt) {
                newOrmsByMovement[action.ormDb.movement] = action.ormDb;
            }
            return {
                ...state,
                ormsByMovement: { ...newOrmsByMovement }
            };
        default:
            return state
    }
}
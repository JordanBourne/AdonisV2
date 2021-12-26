import { store } from '../store';
import { OrmIsFetchedActionFn } from './action-symbols';
import { ormMocks } from './mocks';
export const populateMockOrms = async () => {
    for(const orm of ormMocks) {
        store.dispatch(
            OrmIsFetchedActionFn(
                orm
            )
        );
    }
};
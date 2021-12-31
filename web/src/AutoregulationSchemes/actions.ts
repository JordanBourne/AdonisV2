import { AutoregulationSchemeIsFetchedActionFn } from './action-symbols';
import { store } from '../store';
import { mockSbsRtfAutoregulationScheme } from './mocks';

export const fetchAllAutoregulationSchemes = async () => {
    store.dispatch(
        AutoregulationSchemeIsFetchedActionFn(mockSbsRtfAutoregulationScheme)
    );
};
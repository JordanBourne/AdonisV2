import { AutoregulationSchemeIsFetched } from './action-symbols';
import { AutoregulationSchemeDb } from './types';

interface AutoregulationSchemesStoreState { [ key: string]: AutoregulationSchemeDb };

const initialState: AutoregulationSchemesStoreState = { };

export default function authReducers(state = initialState, action: any) {
    switch (action.type) {
        case AutoregulationSchemeIsFetched:
            return {
                ...state,
                [action.autoregulationSchemeDb.autoregulationSchemeId]: action.autoregulationSchemeDb
            };
        default:
            return state
    }
}
import { AutoregulationSchemeDb } from './types';
export const AutoregulationSchemeIsFetched = 'AutoregulationSchemes/AutoregulationSchemeIsFetched';
export const AutoregulationSchemeIsFetchedActionFn = (autoregulationSchemeDb : AutoregulationSchemeDb) => {
    return {
        autoregulationSchemeDb,
        type: AutoregulationSchemeIsFetched
    };
};
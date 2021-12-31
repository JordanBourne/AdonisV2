import { RootState } from '../store';

export const selectAutoregulationScheme = (autoregulationSchemeId : string) => ( state : RootState ) => state.autoregulationSchemes[autoregulationSchemeId];
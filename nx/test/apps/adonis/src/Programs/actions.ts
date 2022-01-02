import { SBS_RTF } from './mocks';
import { ProgramIsFetchedActionFn } from './action-symbols'; 
import { store } from '../store';
import { ProgramDb } from './types';

export const loadMockSbsRtf = () => {
    const sbsRtfDb = SBS_RTF as ProgramDb;
    sbsRtfDb.programId = 'SBS_RTF';
    store.dispatch(ProgramIsFetchedActionFn(sbsRtfDb));
};

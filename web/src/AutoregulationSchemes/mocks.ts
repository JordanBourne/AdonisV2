import * as uuid from 'uuid';
import { ExtraSetsAdjustOrm } from './types';



export const mockSbsRtfAutoregulationScheme : ExtraSetsAdjustOrm = {
    cognitoIdentityId: uuid.v4(),
    autoregulationSchemeId: 'fe606708-6920-11ec-90d6-0242ac120003',
    type: 'EXTRA_SETS_ADJUST_ORM',
    movements: {
        default: {
            adjustments: [
                {
                    extraSets: Number.NEGATIVE_INFINITY,
                    ormAdjustment: 0.95,
                },
                {
                    extraSets: -2,
                    ormAdjustment: 0.95,
                },
                {
                    extraSets: -1,
                    ormAdjustment: 0.98,
                },
                {
                    extraSets: 0,
                    ormAdjustment: 1.0,
                },
                {
                    extraSets: 1,
                    ormAdjustment: 1.005,
                },
                {
                    extraSets: 2,
                    ormAdjustment: 1.01,
                },
                {
                    extraSets: 3,
                    ormAdjustment: 1.015,
                },
                {
                    extraSets: 4,
                    ormAdjustment: 1.02,
                },
                {
                    extraSets: 5,
                    ormAdjustment: 1.03,
                },
            ]
        }
    }
};
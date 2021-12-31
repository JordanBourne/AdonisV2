export type AutoregulationSchemeDb = ExtraSetsAdjustOrm | SomeOtherAutoRegulationScheme;

export interface AutoregulationSchemeBase {
    cognitoIdentityId: string;
    autoregulationSchemeId: string;
    type: string;
};

interface SomeOtherAutoRegulationScheme extends AutoregulationSchemeBase {
    whatever: string;
}

export interface ExtraSetsAdjustOrmMovementAdjustment {
    extraSets: number;
    ormAdjustment: number;
};

export interface ExtraSetsAdjustOrmMovement {
    adjustments: ExtraSetsAdjustOrmMovementAdjustment[];
};

export interface ExtraSetsAdjustOrm extends AutoregulationSchemeBase {
    type: 'EXTRA_SETS_ADJUST_ORM',
    movements: { [key: string]: ExtraSetsAdjustOrmMovement }
};
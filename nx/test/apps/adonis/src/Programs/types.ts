export interface ProgramDto {
    name: string;
    title: string;
    descriptions: string[];
    setScheme: setScheme;
    autoregulationSchemeId: string;
}

export interface ProgramDb extends ProgramDto {
    cognitoIdentityId: string;
    programId: string;
}

export interface lift {
    estimatedWeight: number;
    reps: number;
    weight: number;
    date: string;
}

export interface trainingMax {
    weight: number;
    date: string;
}

export interface weekMovements {
    [key: number]: string[];
}

export interface setInMovement {
    percent: number,
    repsExpected: number
};

export interface movement {
    sets: setInMovement[];
}


export interface weightScheme {
    primary: movement;
    auxiliary: movement;
    accessory: movement;
}

export interface setScheme {
    weeks: {
        [key: number]: weightScheme;
    };
}

export interface MovementConfiguration {
    name: string;
    assignment: 'primary'|'auxiliary'|'accessory';
    oneRepMax: number;
}

interface DayOfMovementConfiguration {
    [key: number]: {
        movements: MovementConfiguration[]
    }
};

export interface ProgramConfiguration {
    days: DayOfMovementConfiguration
};
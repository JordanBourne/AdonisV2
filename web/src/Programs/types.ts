export interface ProgramDto {
    name: string;
    title: string;
    descriptions: string[];
    daysPerWeek: {
        [key: number]: weekMovements;
    };
    setScheme: setScheme;
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

export interface movement {
    percent: number;
    sets: number[];
}


export interface weightScheme {
    primary: movement;
    auxiliary: movement;
}

export interface setScheme {
    weeks: {
        [key: number]: weightScheme;
    };
}


// not a real object. Just making this for now.
export interface MockMovementDto {
    movement: string;
    startingOneRepMax: number;
};

export const MockSquatMovementDto : MockMovementDto = {
    movement: 'SQUAT',
    startingOneRepMax: 500
};
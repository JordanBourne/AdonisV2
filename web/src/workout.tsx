export const progressionSchemes = {

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

export interface program {
  name: string;
  movements: string[];
  daysPerWeek: {
    [key: number]: weekMovements;
  };
  setScheme: setScheme;
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

export const SBS_RTF_SET_SCHEME: setScheme = {
  weeks: {
    1: {
      primary: {
        percent: 70,
        sets: [5,5,5,5,10]
      },
      auxiliary: {
        percent: 60,
        sets: [7,7,7,7,14]
      }
    },
    2: {
      primary: {
        percent: 75,
        sets: [4,4,4,4,8]
      },
      auxiliary: {
        percent: 65,
        sets: [6,6,6,6,12]
      }
    },
    3: {
      primary: {
        percent: 80,
        sets: [3,3,3,3,6]
      },
      auxiliary: {
        percent: 70,
        sets: [5,5,5,5,10]
      }
    },
    4: {
      primary: {
        percent: 72.5,
        sets: [5,5,5,5,9]
      },
      auxiliary: {
        percent: 62.5,
        sets: [7,7,7,7,13]
      }
    },
    5: {
      primary: {
        percent: 77.5,
        sets: [4,4,4,4,7]
      },
      auxiliary: {
        percent: 67.5,
        sets: [6,6,6,6,11]
      }
    },
    6: {
      primary: {
        percent: 82.5,
        sets: [3,3,3,3,5]
      },
      auxiliary: {
        percent: 72.5,
        sets: [5,5,5,5,9]
      }
    },
    7: {
      primary: {
        percent: 60,
        sets: [5,5,5,5,5]
      },
      auxiliary: {
        percent: 50,
        sets: [5,5,5,5,5]
      }
    },
    8: {
      primary: {
        percent: 75,
        sets: [4,4,4,4,8]
      },
      auxiliary: {
        percent: 65,
        sets: [6,6,6,6,12]
      }
    },
    9: {
      primary: {
        percent: 80,
        sets: [3,3,3,3,6]
      },
      auxiliary: {
        percent: 70,
        sets: [5,5,5,5,10]
      }
    },
    10: {
      primary: {
        percent: 85,
        sets: [2,2,2,2,4]
      },
      auxiliary: {
        percent: 75,
        sets: [4,4,4,4,8]
      }
    },
    11: {
      primary: {
        percent: 77.5,
        sets: [4,4,4,4,8]
      },
      auxiliary: {
        percent: 67.5,
        sets: [7,7,7,7,13]
      }
    },
    12: {
      primary: {
        percent: 82.5,
        sets: [3,3,3,3,5]
      },
      auxiliary: {
        percent: 72.5,
        sets: [5,5,5,5,9]
      }
    },
    13: {
      primary: {
        percent: 87.5,
        sets: [2,2,2,2,3]
      },
      auxiliary: {
        percent: 67.5,
        sets: [4,4,4,4,7]
      }
    },
    14: {
      primary: {
        percent: 60,
        sets: [5,5,5,5,5]
      },
      auxiliary: {
        percent: 50,
        sets: [5,5,5,5,5]
      }
    },
    15: {
      primary: {
        percent: 80,
        sets: [3,3,3,3,6]
      },
      auxiliary: {
        percent: 70,
        sets: [5,5,5,5,10]
      }
    },
    16: {
      primary: {
        percent: 85,
        sets: [2,2,2,2,4]
      },
      auxiliary: {
        percent: 75,
        sets: [4,4,4,4,8]
      }
    },
    17: {
      primary: {
        percent: 90,
        sets: [1,1,1,1,2]
      },
      auxiliary: {
        percent: 80,
        sets: [3,3,3,3,6]
      }
    },
    18: {
      primary: {
        percent: 85,
        sets: [3,3,3,3,5]
      },
      auxiliary: {
        percent: 75,
        sets: [5,5,5,5,9]
      }
    },
    19: {
      primary: {
        percent: 90,
        sets: [2,2,2,2,3]
      },
      auxiliary: {
        percent: 80,
        sets: [4,4,4,4,7]
      }
    },
    20: {
      primary: {
        percent: 95,
        sets: [1,1,1,1,1]
      },
      auxiliary: {
        percent: 85,
        sets: [3,3,3,3,5]
      }
    },
    21: {
      primary: {
        percent: 60,
        sets: [5,5,5,5,5]
      },
      auxiliary: {
        percent: 50,
        sets: [5,5,5,5,5]
      }
    },
  }
}


export const SBS_RTF: program = {
  name: 'Stronger by Science - Reps to Failure',
  movements: ['p1', 'p2', 'p3', 'p4', 'p1a1', 'p1a2', 'p2a1', 'p2a1', 'p3a1', 'p4a1'],
  daysPerWeek: {
    4: {
      1: ['p1', 'p2a2', 'p3a1'],
      2: ['p2', 'p1a1', 'p4a1'],
      3: ['p3', 'p2a1'],
      4: ['p4', 'p1a2']
    }
  },
  setScheme: SBS_RTF_SET_SCHEME
}
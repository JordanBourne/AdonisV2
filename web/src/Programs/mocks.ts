import { ProgramDto, setScheme } from './types';
import { fromPairs } from 'lodash';
import { ProgramConfiguration } from './types';

export const SBS_RTF_SET_SCHEME: setScheme = {
    "weeks": {
        "1": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 10,
                        "percent": 0.7
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 14,
                        "percent": 0.6
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "2": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.75
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 12,
                        "percent": 0.65
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "3": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.8
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 10,
                        "percent": 0.7
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "4": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 9,
                        "percent": 0.725
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.625
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.625
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.625
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.625
                    },
                    {
                        "repsExpected": 13,
                        "percent": 0.625
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "5": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.775
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 11,
                        "percent": 0.675
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "6": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.825
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 9,
                        "percent": 0.725
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "7": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "8": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.75
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.65
                    },
                    {
                        "repsExpected": 12,
                        "percent": 0.65
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "9": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.8
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 10,
                        "percent": 0.7
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "10": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.85
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.75
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "11": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.775
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.775
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 13,
                        "percent": 0.675
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "12": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.825
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.825
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.725
                    },
                    {
                        "repsExpected": 9,
                        "percent": 0.725
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "13": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.875
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.875
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.875
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.875
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.875
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.675
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.675
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "14": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "15": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.8
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.7
                    },
                    {
                        "repsExpected": 10,
                        "percent": 0.7
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "16": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.85
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.75
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "17": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.9
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 6,
                        "percent": 0.8
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "18": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.85
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.75
                    },
                    {
                        "repsExpected": 9,
                        "percent": 0.75
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "19": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 2,
                        "percent": 0.9
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.9
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 4,
                        "percent": 0.8
                    },
                    {
                        "repsExpected": 7,
                        "percent": 0.8
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "20": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 3,
                        "percent": 0.85
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.85
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        },
        "21": {
            "primary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.6
                    }
                ]
            },
            "auxiliary": {
                "sets": [
                    {
                        "repsExpected": 1,
                        "percent": 0.95
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 5,
                        "percent": 0.5
                    }
                ]
            },
            "accessory": {
                "sets": [
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    },
                    {
                        "repsExpected": 8,
                        "percent": 0.5
                    }
                ]
            }
        }
    }
}



export const SBS_RTF: ProgramDto = {
    title: 'SBS RTF',
    name: 'Stronger by Science - Reps to Failure',
    descriptions: [
        '21 weeks',
        'Primary and Auxiliary movements',
        'Automated progression regulation',
    ],
    setScheme: SBS_RTF_SET_SCHEME
};

export const dansProgramConfiguration: ProgramConfiguration = {
    days: {
        1: {
            movements: [{
                name: 'Squat',
                oneRepMax: 315,
                assignment: 'primary',
            }, {
                name: 'Decline Bench',
                oneRepMax: 225,
                assignment: 'primary',
            }, {
                name: 'Meadows Rows',
                oneRepMax: 185,
                assignment: 'auxiliary',
            }, {
                name: 'Hammer Curl',
                oneRepMax: 35,
                assignment: 'accessory',
            }]
        },
        2: {
            movements: [{
                name: 'Bench Press',
                oneRepMax: 225,
                assignment: 'primary',
            }, {
                name: 'Bulgarian Split Squat',
                oneRepMax: 95,
                assignment: 'auxiliary',
            }, {
                name: 'One Arm Dumbbell Row',
                oneRepMax: 90,
                assignment: 'auxiliary',
            }]
        },
        3: {
            movements: [{
                name: 'Deadlift',
                oneRepMax: 310,
                assignment: 'primary',
            }, {
                name: 'OHP',
                oneRepMax: 125,
                assignment: 'primary',
            }, {
                name: 'Incline Dumbell Curl',
                oneRepMax: 35,
                assignment: 'auxiliary',
            }, {
                name: 'Lateral Raise',
                oneRepMax: 25,
                assignment: 'accessory',
            }]
        },
        4: {
            movements: [{
                name: 'Weighted Hip Thrust',
                oneRepMax: 285,
                assignment: 'auxiliary',
            }, {
                name: 'Close Grip Bench Press',
                oneRepMax: 200,
                assignment: 'auxiliary',
            }, {
                name: 'Cable Pulldown',
                oneRepMax: 135,
                assignment: 'auxiliary',
            }, {
                name: 'Cable Row',
                oneRepMax: 135,
                assignment: 'auxiliary',
            }]
        },
        5: {
            movements: [{
                name: 'Incline Dumbell Press',
                oneRepMax: 95,
                assignment: 'primary',
            }, {
                name: 'Leg Press',
                oneRepMax: 435,
                assignment: 'auxiliary',
            }, {
                name: 'Preacher Curls',
                oneRepMax: 50,
                assignment: 'accessory',
            }, {
                name: 'Lateral Raise',
                oneRepMax: 25,
                assignment: 'accessory',
            }]
        }
    }
};

export const myProgramConfiguration: ProgramConfiguration = dansProgramConfiguration;
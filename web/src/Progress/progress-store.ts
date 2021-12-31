import { CompleteTodos, AddTodos, MarkComplete } from './action-symbols';

interface Progress {
    thingsToDo: 0,
    thingsDone: 0
}

interface AllPrograms {
    [key: string]: Progress
};

const initialState: AllPrograms = {};

export default function authReducers(state = initialState, action: any) {
    switch (action.type) {
        case MarkComplete:
            return {
                ...state,
                [action.identifier]: { thingsToDo: 0, thingsDone: 0 }
            };
        case AddTodos:
            return {
                ...state,
                [action.identifier]: {
                    ...state[action.identifier],
                    thingsToDo: state[action.identifier].thingsToDo + action.count
                }
            };
        case CompleteTodos:
            return {
                ...state,
                [action.identifier]: {
                    ...state[action.identifier],
                    thingsDone: state[action.identifier].thingsDone + action.count
                }
            };
        default:
            return state
    }
}
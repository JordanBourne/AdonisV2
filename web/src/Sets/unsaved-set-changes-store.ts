import { SetHasUnsavedChanges, SetHasBeenSaved } from './action-symbols';

interface UnsavedSetChanges {
    [key: string]: boolean
};

const initialState: UnsavedSetChanges = {};

export default function authReducers(state = initialState, action: any) {
    switch (action.type) {
        case SetHasUnsavedChanges:
            return {
                ...state,
                [action.set.setId]: true
            };
        case SetHasUnsavedChanges:
            delete state[action.set.setId]
            return {
                ...state
            };
        default:
            return state
    }
}
import { SET_INPUT, RECEIVE_OUTPUT } from '../actions/query';

export function input(state = {}, action) {
    switch (action.type) {
        case SET_INPUT:
            return action.input;
    }

    return state;
}

export function output(state = {}, action) {
    switch (action.type) {
        case SET_INPUT:
            return null;
        case RECEIVE_OUTPUT:
            return action.output;
    }

    return state;
}

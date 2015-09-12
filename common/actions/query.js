import { search } from '../api/query';

export const SET_INPUT = 'SET_INPUT';
export const RECEIVE_OUTPUT = 'RECEIVE_OUTPUT';

function setInput(input) {
  return {
    type: SET_INPUT,
    input: input
  };
}

function receiveOutput(output) {
  return {
    type: RECEIVE_OUTPUT,
    output: output
  };
}

function doSearch(input) {
    return dispatch => {
        dispatch(setInput(input));
        return search(input, output => dispatch(receiveOutput(output)));
    };
}

export function query(query_string) {
    return (dispatch, getState) => {
        let { input } = getState();

        if (query_string) {
            input.body = {
                query: {
                    query_string: {
                        query: query_string
                    }
                }
            };
        } else {
            input.body = {};
        }

        return doSearch(input)(dispatch);
    };
}

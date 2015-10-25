import Immutable from 'immutable';

import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from '../contants/actionTypes';

const defaultState = Immutable.Map();

export default function todoReducer(state = defaultState, action) {
    switch(action.type) {
        case CREATE_TODO:
            return state.set(action._id, action.text);
        case EDIT_TODO:
            return state.set(action._id, action.text);
        case DELETE_TODO:
            return state.delete(action._id);
        default:
            return state;
    }
}

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware
)(createStore);

export default function congifureStore(...args) {
    return createStoreWithMiddleware(...args);
}

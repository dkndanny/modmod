import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import rootReducer from '../shared/reducers';
import configureStore from '../shared/store';
import routes from '../shared/routes';

const history = createBrowserHistory();

let initialState = window.__INITIAL_STATE__;
// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object.keys(initialState).forEach(key => {
    initialState[key] = fromJS(initialState[key]);
});

const store = configureStore(rootReducer, initialState);

render(
    <Provider store={store}>
        <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);

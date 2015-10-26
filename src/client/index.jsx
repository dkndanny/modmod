import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
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
    (
        <div>
            <Provider store={store}>
                <Router children={routes} history={history} />
            </Provider>
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        </div>
    ),
    document.getElementById('react-view')
);

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import mongo from 'mongodb';
import monk from 'monk';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';

import todo from './routes/todo';

import rootReducer from '../shared/reducers';
import configureStore from '../shared/store';
import routes from '../shared/routes';

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static('dist'));

// Datebase connection middleware
const db = monk('localhost:27017/modmod');
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Api routes
app.use('/todo', todo);

// React routes
app.use((req, res) => {
    const location = createLocation(req.url);
    const store = configureStore(rootReducer);

    match({ routes, location }, (err, redirectLocation, renderProps) => {
        if (err) {
            console.log(err);
            return res.status(500).end('Internal server error.');
        }

        if (!renderProps) {
            return res.status(404).end('Not found.');
        }

        const InitalComponent = (
            <Provider store={store}>
                <RoutingContext {...renderProps} />
            </Provider>
        );

        const componentHTML = renderToString(InitalComponent);

        // Transform Immutable.js object back to vanilla JS,
        // for client cosuming
        let initialState = Object.assign({}, store.getState());
        Object.keys(initialState).forEach(key => {
            initialState[key] = initialState[key].toJS();
        });

        const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Isomorphic Redux</title>
                <script type="application/javascript">
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
            </head>
            <body>
                <div id="react-view">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>
        `;

        res.end(HTML);
    })
});

export default app;

/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import qs from 'qs';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/QueryApp';
import { search } from '../common/api/query';

const app = new Express();
const port = 3000;

// Use this middleware to server up static files built into dist
app.use(require('serve-static')(path.join(__dirname, '../dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
    var input = {
        index: 'generic',
        type: 'thing',
        body: {
        }
    };

    search(input, output => {
        // Compile an initial state
        const initialState = { input, output };

        // Create a new Redux store instance
        const store = configureStore(initialState);

        // Render the component to a string
        const html = React.renderToString(
            <Provider store={store}>
            { () => <App/> }
            </Provider>);

        // Grab the initial state from our Redux store
        const finalState = store.getState();

        // Send the rendered page back to the client
        res.send(renderFullPage(html, finalState));
    });
}

function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>Elasticsearch Query Interface</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
    </head>
    <body>
    <div id="app">${html}</div>
    <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="/bundle.js"></script>
    </body>
    </html>
    `;
}

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});

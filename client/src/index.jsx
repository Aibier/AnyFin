import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
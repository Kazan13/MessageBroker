import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from './redux/reducers'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
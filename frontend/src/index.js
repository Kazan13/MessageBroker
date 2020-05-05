import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./redux/store";
import WebSocketService from "./services/web-socket-service";

let ws = new WebSocketService(store);
ws.setupSocket();
ReactDOM.render(
    <Provider store={store}>
        <App ws = {ws}/>
    </Provider>,
    document.getElementById('root')
);
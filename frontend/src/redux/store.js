import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Map} from 'immutable';

const initialState = Map({
    createChannelWindow: false,
    signUpLayer: false,
    signInLayer: true,
    token: '',
    messenger: false,
    channels: Map()
});
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
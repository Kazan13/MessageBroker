import {combineReducers} from "redux";
import createChannelWindow from "./create-channel-window";
import signUpLayer from "./sign-up-layer";
import signInLayer from "./sign-in-layer";
import token from "./token";
import messenger from "./messenger";

export default combineReducers({
    createChannelWindow,
    signUpLayer,
    signInLayer,
    token,
    messenger
})
import {combineReducers} from "redux-immutable";
import createChannelWindowReducer from "./create-channel-window_reducer";
import signUpLayerReducer from "./sign-up-layer_reducer";
import signInLayerReducer from "./sign-in-layer_reducer";
import tokenReducer from "./token_reducer";
import messengerReducer from "./messenger_reducer";
import channelsReducer from "./channels_reducer";

export default combineReducers({
    createChannelWindow: createChannelWindowReducer,
    signUpLayer: signUpLayerReducer,
    signInLayer: signInLayerReducer,
    token: tokenReducer,
    messenger: messengerReducer,
    channels : channelsReducer
})
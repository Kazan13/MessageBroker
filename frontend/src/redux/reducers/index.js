import {combineReducers} from "redux-immutable";
import tokenReducer from "./token_reducer";
import messengerReducer from "./messenger_reducer";
import modalWindowReducer from "./modal_window_reducer";

export const reducer =  combineReducers({
    modalWindow: modalWindowReducer,
    auth: tokenReducer,
    messenger : messengerReducer
})

import {Types} from "../action-types/action-types";

const initialState = {
    channels: new Map(),
    currentChannel: undefined
}
export const messengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_CHANNELS: {
            return {
                ...state,
                channels: action.payload
            }
        }
        case Types.SELECT_CURRENT_CHANNEL: {
            return {
                ...state,
                currentChannel: action.payload
            }
        }
        default: {
            return {...state};
        }
    }
}
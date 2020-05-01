
import {Types} from "../action-types/action-types";

const initialState = {
    channels: new Map(),
    allChannels: new Map(),
    currentChannel: undefined,
    filterChannel: ''
}
export const messengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FIND_CHANNEL: {
            return {
                ...state,
                filterChannel: action.payload
            }
        }
        case Types.SET_CHANNELS: {
            return {
                ...state,
                channels: action.payload
            }
        }
        case Types.SET_ALL_CHANNELS: {
            return {
                ...state,
                allChannels: action.payload
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
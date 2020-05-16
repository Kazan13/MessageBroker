import {Types} from "../action-types/action-types";

const initialState = {
    channels: new Map(),
    allChannels: new Map(),
    currentChannel: undefined,
    filterChannel: '',
    messages: new Map(),
}
export const messengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_MESSAGES: {
            return {
                ...state,
                messages: new Map(Object.entries(action.payload))
            }
        }
        case Types.NEW_MESSAGE: {
            if (state.messages.get(action.payload.channelId + '') === undefined) {
                debugger
                state.messages.set(action.payload.channelId + '', []);
                debugger
                return {
                    ...state
                }
            } else {
                debugger
                state.messages.set(
                    action.payload.channelId + '',
                    [
                        ...state.messages.get(action.payload.channelId + ''),
                        action.payload
                    ]
                );
                debugger
                return {
                    ...state
                }
            }
        }
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
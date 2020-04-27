
import {Types} from "../action-types/action-types";

const initialState = {
    channels: new Map()
}
export default function messengerReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_CHANNELS: {
            return {
                ...state,
                channels: action.payload
            }
        }
        default: {
            return {...state};
        }
    }
}
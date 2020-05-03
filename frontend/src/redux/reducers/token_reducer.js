import {getCookie} from "../getCookie";
import {Types} from "../action-types/action-types";

const initialState = {
    token: {
        token: getCookie('token')
    }
};

export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_TOKEN: {
            return {
                ...state,
                token: {
                    token: action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
}
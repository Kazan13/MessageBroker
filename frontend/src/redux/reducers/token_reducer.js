import {getCookie} from "../getCookie";
import {Types} from "../action-types/action-types";

const initialState = {
    token: {
        token: getCookie('token'),
        id: undefined
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
        case Types.SET_ID: {
            return {
                ...state,
                id: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
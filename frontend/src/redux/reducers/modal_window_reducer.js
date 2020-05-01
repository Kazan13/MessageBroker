import {Types} from "../action-types/action-types";

const initialState = {
    signInWindow: {isVisible: false},
    signUpWindow: {isVisible: false},
    createChannelWindow: {isVisible: false},
    searchChannelWindow: {isVisible: false},
    messenger: {isVisible: false},
    splashScreen: {isVisible: true}
}

export const modalWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SHOW_SIGN_IN_WINDOW: {
            return {
                ...state,
                signInWindow: {
                    isVisible: true,
                }
            }
        }
        case Types.HIDE_SIGN_IN_WINDOW: {
            return {
                ...state,
                signInWindow: {
                    isVisible: false,
                }
            }
        }
        case Types.SHOW_SIGN_UP_WINDOW: {
            return {
                ...state,
                signUpWindow: {
                    isVisible: true
                }
            }
        }
        case Types.HIDE_SIGN_UP_WINDOW: {
            return {
                ...state,
                signUpWindow: {
                    isVisible: false
                }
            }
        }
        case Types.SHOW_CREATE_CHANNEL_WINDOW: {
            return {
                ...state,
                createChannelWindow: {
                    isVisible: true
                }
            }
        }
        case Types.HIDE_CREATE_CHANNEL_WINDOW: {
            return {
                ...state,
                createChannelWindow: {
                    isVisible: false
                }
            }
        }
        case Types.SHOW_MESSENGER: {
            return {
                ...state,
                messenger: {
                    isVisible: true
                }
            }
        }
        case Types.HIDE_MESSENGER: {
            return {
                ...state,
                messenger: {
                    isVisible: false
                }
            }
        }
        case Types.SHOW_SEARCH_CHANNEL_WINDOW: {
            return {
                ...state,
                searchChannelWindow: {
                    isVisible: true
                }
            }
        }
        case Types.HIDE_SEARCH_CHANNEL_WINDOW: {
            return {
                ...state,
                searchChannelWindow: {
                    isVisible: false
                }
            }
        }
        case Types.HIDE_SPLASH_SCREEN: {
            return {
                ...state,
                splashScreen: {
                    isVisible: false
                }
            }
        }
        default: {
            return state;
        }
    }
}
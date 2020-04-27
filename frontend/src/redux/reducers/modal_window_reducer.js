const initialState = {
    signInWindow: {isVisible: true},
    signUpWindow: {isVisible: false},
    createChannelWindow: {isVisible: false},
    messenger: {isVisible: false}
}

export default function modalWindowReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SIGN_IN_WINDOW': {
            return {
                ...state,
                signInWindow: {
                    isVisible: true,
                }
            }
        }
        case 'HIDE_SIGN_IN_WINDOW': {
            return {
                ...state,
                signInWindow: {
                    isVisible: false,
                }
            }
        }
        case 'SHOW_SIGN_UP_WINDOW': {
            return {
                ...state,
                signUpWindow: {
                    isVisible: true
                }
            }
        }
        case 'HIDE_SIGN_UP_WINDOW': {
            return {
                ...state,
                signUpWindow: {
                    isVisible: false
                }
            }
        }
        case 'SHOW_CREATE_CHANNEL_WINDOW': {
            return {
                ...state,
                createChannelWindow: {
                    isVisible: true
                }
            }
        }
        case 'HIDE_CREATE_CHANNEL_WINDOW': {
            return {
                ...state,
                createChannelWindow: {
                    isVisible: false
                }
            }
        }
        case 'SHOW_MESSENGER': {
            return {
                ...state,
                messenger: {
                    isVisible: true
                }
            }
        }
        case 'HIDE_MESSENGER': {
            return {
                ...state,
                messenger: {
                    isVisible: false
                }
            }
        }
        default: {
            return state;
        }
    }
}
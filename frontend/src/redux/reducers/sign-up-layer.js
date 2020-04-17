const initialState = false;

export default function signUpLayer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SIGN_UP_LAYER': {
            return true;
        }
        case 'HIDE_SIGN_UP_LAYER': {
            return false;
        }
        default: {
            return state;
        }
    }
}
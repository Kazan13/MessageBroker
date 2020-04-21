const initialState = false;

export default function signUpLayerReducer(state, action) {
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
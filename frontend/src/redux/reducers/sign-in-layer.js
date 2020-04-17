const initialState = true;

export default function signInLayer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SIGN_IN_LAYER': {
            return true;
        }
        case 'HIDE_SIGN_IN_LAYER': {
            return false;
        }
        default: {
            return state;
        }
    }
}
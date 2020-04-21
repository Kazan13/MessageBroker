
export default function signInLayerReducer(state, action) {
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
const initialState = false;

export default function messenger(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_MESSENGER': {
            return true
        }
        case 'HIDE_MESSENGER': {
            return false
        }
        default: {
            return state;
        }
    }
}
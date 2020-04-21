export default function messengerReducer(state, action) {
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
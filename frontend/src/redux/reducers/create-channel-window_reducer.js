
export default function createChannelWindowReducer(state, action) {
    switch (action.type) {
        case 'SHOW_CREATE_CHANNEL_WINDOW': {
            return true;
        }
        case 'HIDE_CREATE_CHANNEL_WINDOW': {
            return false;
        }
        default: {
            return state;
        }
    }
}
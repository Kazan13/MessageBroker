const initialState = false;

export default function createChannelWindow(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_CREATE_CHANNEL_WINDOW': {
            return action.payload;
        }
        case 'HIDE_CREATE_CHANNEL_WINDOW': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
const initialState = {
    channels: new Map()
}
export default function messengerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CHANNELS': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
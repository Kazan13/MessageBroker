
export default function channelsReducer(state, action) {
    switch (action.type) {
        case 'SET_CHANNELS': {
            return action.payload;
        }
        case 'GET_CHANNELS': {
            debugger
            return state
        }
        default: {
            debugger
            return state;
        }
    }
}
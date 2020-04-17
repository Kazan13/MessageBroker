const initialState = '';

export default function token(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKEN': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
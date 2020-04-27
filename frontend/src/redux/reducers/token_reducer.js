const initialState = {
    token: {
        token: ''
    }
};

export default function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKEN': {
            return {
                ...state,
                token: {
                    token: action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
}
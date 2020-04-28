const initialState = {
    token: {
        token: ''
    }
};

export const tokenReducer = (state = initialState, action) => {
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
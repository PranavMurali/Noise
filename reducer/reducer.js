
export const initialState = {
    voice :"en-US",
    pitchs : 1,
    rates: 1,

};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VOICE':
            return {
                ...state,
                voice: action.payload,
            };
        case 'SET_PITCH':
            return {
                ...state,
                pitchs: action.payload,
            };
        case 'SET_RATE':
            return {
                ...state,
                rates: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
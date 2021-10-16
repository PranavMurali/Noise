import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    camera: null,
    model_pred: null,
    model_pred_prob: null,
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCamera: (state, action) => {
            state.camera = action.payload
        },
        setModelPred: (state, action) => {
            state.model_pred = action.payload
        },
        setModelPredProb: (state, action) => {
            state.model_pred_prob = action.payload
        },
    },
});

export const { setCamera, setModelPred, setModelPredProb } = navSlice.actions;


export const selectCamera = (state) => state.nav.camera;
export const selectModelPred = (state) => state.nav.model_pred;
export const selectModelPredProb = (state) => state.nav.model_pred_prob;

export default navSlice.reducer;
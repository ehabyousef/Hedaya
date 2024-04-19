// mySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isValueTrue: true,
};

const TureOr = createSlice({
    name: 'TureOr',
    initialState,
    reducers: {
        setValueTrue: (state) => {
            state.isValueTrue = true;
        },
        setValueFalse: (state) => {
            state.isValueTrue = false;
        },
        toggleValue: (state) => {
            state.isValueTrue = !state.isValueTrue;
        },
    },
});

export const { setValueTrue, setValueFalse, toggleValue } = TureOr.actions;

export default TureOr.reducer;

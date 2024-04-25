// mySlice.js

import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Function to save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch {
        // Ignore write errors
    }
};

const initialState = loadState() || {
    isValueTrue: false,
};

const TureOr = createSlice({
    name: 'TureOr',
    initialState,
    reducers: {
        setValueTrue: (state) => {
            state.isValueTrue = true;
            saveState(state); // Save state to local storage
        },
        setValueFalse: (state) => {
            state.isValueTrue = false;
            saveState(state); // Save state to local storage
        },
        toggleValue: (state) => {
            state.isValueTrue = !state.isValueTrue;
            saveState(state); // Save state to local storage
        },
    },
});

export const { setValueTrue, setValueFalse, toggleValue } = TureOr.actions;

export default TureOr.reducer;

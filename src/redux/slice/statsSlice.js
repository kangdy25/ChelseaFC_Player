import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

let statsSlice = createSlice({
    name : 'stats',
    initialState,
    reducers: {
        setStats: (state, action) => action.payload,
        resetStats: () => initialState,
    }
})

export const { setStats, resetStats } = statsSlice.actions;
export default statsSlice.reducer;
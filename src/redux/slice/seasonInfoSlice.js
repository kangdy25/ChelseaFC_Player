import { createSlice } from '@reduxjs/toolkit';
import player2324 from '../../Database/2324_player.js'
import player2425 from '../../Database/2425_player.js'

const initialState = [player2324, player2425];

let seasonInfoSlice = createSlice({
    name : 'seasonInfo',
    initialState,
    reducers: {
        setSeasonInfo: (state, action) => action.payload,
    }
})

export const { setSeasonInfo } = seasonInfoSlice.actions;
export default seasonInfoSlice.reducer;
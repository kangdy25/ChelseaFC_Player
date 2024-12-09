import { configureStore } from '@reduxjs/toolkit'
import seasonInfoReducer from '../slice/seasonInfoSlice.js';
import orderRedever from '../slice/orderSlice.js'

const store = configureStore({
    reducer: {
        seasonInfo: seasonInfoReducer,
        order: orderRedever,
    }
}) 

export default store;
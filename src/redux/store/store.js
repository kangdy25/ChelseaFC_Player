import { configureStore } from '@reduxjs/toolkit'
import seasonInfoReducer from '../slice/seasonInfoSlice.js';
import orderReducer from '../slice/orderSlice.js'
import statsReducer from '../slice/statsSlice.js'

const store = configureStore({
    reducer: {
        seasonInfo: seasonInfoReducer,
        order: orderReducer,
        stats: statsReducer,
    }
}) 

export default store;
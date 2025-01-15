import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from "../slice/restaurantSlice.js";
import reviewReducer from '../slice/reviewSlice.js'

const store = configureStore({
    reducer: {
        restaurant: restaurantReducer,
        review: reviewReducer,
    },
});

export default store;
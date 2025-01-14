import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from "../slice/restaurantSlice.js";

const store = configureStore({
    reducer: {
        restaurant: restaurantReducer,
    },
});

export default store;
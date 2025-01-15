import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from "../slice/restaurantSlice.js";
import userReducer from "../slice/userSlice.js"

const store = configureStore({
    reducer: {
        restaurant: restaurantReducer,
        user: userReducer,
    },
});

export default store;
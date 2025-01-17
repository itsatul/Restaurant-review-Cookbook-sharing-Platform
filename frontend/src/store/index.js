import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from "../slice/restaurantSlice.js";
import reviewReducer from '../slice/reviewSlice.js'
import userReducer from '../slice/userSlice.js'


const store = configureStore({
    reducer: {
        restaurant: restaurantReducer,
        review: reviewReducer,
        user: userReducer,
    },
});

export default store;
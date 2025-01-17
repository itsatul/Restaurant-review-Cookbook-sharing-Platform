import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for fetching data
export const fetchRestaurantData = createAsyncThunk(
    'restaurant/fetchRestaurantData',
    async () => {
        const response = await axios.get('https://luna-project-batch30.propulsion-learn.ch/backend/api/restaurants/');
        return response.data;

    }
);

// fetching restaurants by User
export const fetchRestaurantsByUser = createAsyncThunk(
    'restaurant/fetchRestaurantsByUser',
    async (userId) => {
        const response = await axios.get(`https://luna-project-batch30.propulsion-learn.ch/backend/api/restaurants/user/${userId}/`);
        return {userId, restaurants: response.data}
    }
)

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        restaurantsByUser: {},
        data: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRestaurantData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchRestaurantData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })
            .addCase(fetchRestaurantsByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRestaurantsByUser.fulfilled, (state, action) => {
                const {userId, restaurants} = action.payload;
                state.status = 'succeeded';
                state.restaurantsByUser[userId] = restaurants;
            })
            .addCase(fetchRestaurantsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })

    }
})

export default restaurantSlice.reducer;
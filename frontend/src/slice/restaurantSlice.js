import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for fetching data
export const fetchRestaurantData = createAsyncThunk(
    'restaurant/fetchRestaurantData',
    async () => {
        const response = await axios.get('https://dummyjson.com/products');
        return response.data.products
    }
);

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
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
    }
})

export default restaurantSlice.reducer;
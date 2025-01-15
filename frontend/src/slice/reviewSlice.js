import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for fetching data
export const fetchReviewData = createAsyncThunk(
    'review/fetchReviewData',
    async () => {
        const response = await axios.get('https://dummyjson.com/posts');
        return response.data.posts
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchReviewData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })
    }
})

export default reviewSlice.reducer;
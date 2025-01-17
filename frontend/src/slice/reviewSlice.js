import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for fetching data
export const fetchReviewData = createAsyncThunk(
    'review/fetchReviewData',
    async () => {
        try {
            const response = await axios.get('https://luna-project-batch30.propulsion-learn.ch/backend/api/reviews/');
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error; // Re-throw to trigger rejected case
        }
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
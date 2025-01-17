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

// fetch reviews by User
export const fetchReviewsByUser = createAsyncThunk(
    "review/fetchReviewsByUser",
    async (userId) => {
        const response = await axios.get(
            `https://luna-project-batch30.propulsion-learn.ch/backend/api/reviews/user/${userId}/`
        );
        return {userId, reviews: response.data};
    }
);

// fetch review by Id
export const fetchReviewById = createAsyncThunk(
    "review/fetchReviewById",
    async (reviewId) => {
        const response = await axios.get(
            `https://luna-project-batch30.propulsion-learn.ch/backend/api/reviews/${reviewId}/`
        );
        return response.data;
    }
);

// fetch comments by Users
// api a call was included in reviewSlice.js as comments are always shown together with their related reviews
export const fetchCommentsByUser = createAsyncThunk(
    "review/fetchCommentsByUser",
    async (userId, {getState}) => {
        const state = getState();
        const token = state.review.token

        const response = await axios.get(
            `https://luna-project-batch30.propulsion-learn.ch/backend/api/review/comment/user/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${token}` // send token in header
                },
            });
        console.log('user comments redux', response.data)
        return {userId, comments: response.data}
    }
)

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviewsByUser: {},
        commentsByUser: {},
        reviewDetails: null,
        status: 'idle',
        error: null,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3MzgyODA2LCJpYXQiOjE3MzY5NTA4MDYsImp0aSI6ImMyZWY3NjM4NTEzYzRjNTBiNWVmMDk4ZmNmNTI0MzE0IiwidXNlcl9pZCI6M30.b1GCn866kbZIknfZKJZktRpeKiEPxKCuSqaM5aQ09ts',

    },
    extraReducers: (builder) => {
        builder
            // handling fetching reviews by User
            .addCase(fetchReviewsByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
                const {userId, reviews} = action.payload;
                state.status = 'succeeded';
                state.reviewsByUser[userId] = reviews;
            })
            .addCase(fetchReviewsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })

            // handling fetching review by Id
            .addCase(fetchReviewById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })

            // handling fetching comments by Id
            .addCase(fetchCommentsByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentsByUser.fulfilled, (state, action) => {
                const {userId, comments} = action.payload;
                state.status = 'succeeded';
                state.commentsByUser[userId] = comments;
            })
            .addCase(fetchCommentsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })
    }
})

export default reviewSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for fetching data
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, {getState}) => {
        const state = getState(); // access state to get hold of token
        const token = state.user.access

        const response = await axios.get('https://luna-project-batch30.propulsion-learn.ch/backend/api/me/', {
            headers: {
                Authorization: `Bearer ${token}` // send token in header
            },
        });
        return response.data
    }
);

// thunk for patch request
export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (profileValues, {rejectWithValue, getState}) => {
        const state = getState();
        const token = state.user.access; // fetching token from redux store
        console.log('redux updateUserData called', profileValues)
        try {
            const response = await axios.patch(
                'https://luna-project-batch30.propulsion-learn.ch/backend/api/me/',
                profileValues,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            console.log('response', response.data)
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }

    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        access: localStorage.getItem('access') || undefined,
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.access = action.payload.access;
            // state.user = action.payload.user;
        },
        logout: (state) => {
            state.access = null;
            // state.user = null;
        },
        setProfileValues: (state, action) => {
            const {field, value} = action.payload;
            if (state.data) {
                state.data[field] = value;
            }
            ;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred.';
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload;
            })
    }
})

export const {login, logout, setProfileValues} = userSlice.actions;

export default userSlice.reducer;
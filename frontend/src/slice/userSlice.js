import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {access: undefined, user: undefined},
    reducers: {
        login: (state, action) => {
            state.access = action.payload.access;
            // state.user = action.payload.user;
        },
        logout: (state) => {
            state.access = null;
            // state.user = null;
        },
    },
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state) => {
            state.error = null;

        },
        signInstart: (state) => {
            state.loading = true

        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;

        },
        signInFailuer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateuserStart: (state) => {
            state.loading = true;
        },
        updateusersuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateuserfail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteuserStart: (state) => {
            state.loading = true;
        },
        deleteusersuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteuserfail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutuserStart: (state) => {
            state.loading = true;
        },
        signoutusersuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutuserfail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})
export const { setError, signInstart, signInSuccess, signInFailuer, 
    updateuserStart, updateusersuccess, updateuserfail,deleteuserStart,
    deleteusersuccess,deleteuserfail,signoutuserStart,signoutusersuccess, signoutuserfail
} = userSlice.actions;
export default userSlice.reducer;
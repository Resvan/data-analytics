import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    type: 'All',
    year: '2023',
    duration:'All',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setYear: (state, action)=>{
            state.year = action.payload.year
        },
        setType: (state, action)=>{
            state.type = action.payload.type
        },
        setDuration: (state, action)=>{
            state.duration = action.payload.duration
        }
    },
});

export const { setMode, setLogin, setLogout,  setUser, setYear, setType, setDuration  } = authSlice.actions;
export default authSlice.reducer;
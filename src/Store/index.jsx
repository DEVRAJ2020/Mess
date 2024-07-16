import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/UserSlices";




const STORE=configureStore({
    reducer:{
        users:UserSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),})
export default STORE;
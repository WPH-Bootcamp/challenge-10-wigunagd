import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./1_authSlice";
import { meReducer } from "./1_meSlice";

export const allReducers = combineReducers({
    auth: authReducer,
    me: meReducer
});
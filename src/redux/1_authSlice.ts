import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './0_authType';

const initialState: AuthState = {
    isLoggedin: false,
    accessToken: ""
}

export const authSlice = createSlice({
    name: 'auth/slice',
    initialState: initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<string>) => {
            state.isLoggedin = true;
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.accessToken = "";
            state.isLoggedin = false;
        }
    }
});

export const { setLoginData, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MeProfileType } from './0_authType';

const initialState: MeProfileType = {
    id: null,
    name: null,
    email: null,
    username: null,
    headline: null,
    avatarUrl: null,
    avatarPublicId: null
}

export const meSlice = createSlice({
    name: 'meProfile/slice',
    initialState: initialState,
    reducers: {
        setMeData: (state, action: PayloadAction<MeProfileType>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.headline = action.payload.headline;
            state.avatarUrl = action.payload.avatarUrl;
            state.avatarPublicId = action.payload.avatarPublicId;
        },
        clearMeData: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.username = null;
            state.headline = null;
            state.avatarUrl = null;
            state.avatarPublicId = null;
        }
    }
});

export const { setMeData, clearMeData } = meSlice.actions;
export const meReducer = meSlice.reducer;
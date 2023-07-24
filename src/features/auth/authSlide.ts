import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { AxiosError } from "../../services/http.service";
import { login } from "../../services/auth.service";
import { LoginFormInput } from "../../types/login-form-input.type";
import { LoginErrorResponse, LoginResponse } from "../../types/login.type";

// Define a type for the slice state
export interface AuthState {
    profile: string;
    email: string;
    loginResponse: LoginResponse | null;
}

export const loginThunk = createAsyncThunk<
    LoginResponse, // response
    LoginFormInput, // input
    { rejectValue: LoginErrorResponse } // error
>(
    "auth/loginThunkStatus",
    async (user: LoginFormInput, { rejectWithValue }) => {
        try {
            const response = await login(user.email, user.password);
            // set token
            localStorage.setItem("token", JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            let err: AxiosError<LoginErrorResponse> = error;
            if (!err.response) {
                throw error;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

// กำหนด state เริ่มต้น
const initialState: AuthState = {
    profile: "Usman",
    email: "usman@mail.com",
    loginResponse: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        update: (state) => {
            state.profile = "Mk";
            state.email = "mk@gmail.com";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loginThunk.fulfilled,
            (state, action: PayloadAction<LoginResponse | null>) => {
                // กรณีใช้ global state
                state.loginResponse = action.payload;
            }
        );
    },
});
// export function reducer
export const { update } = authSlice.actions;
// export state
export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;

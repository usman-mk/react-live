import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../features/auth/authSlide";
import { roomBookingSlice } from "../features/room/roomSlide";

export const store = configureStore({
    reducer: {
        authState: authSlice.reducer,
        roomBookingState: roomBookingSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { AxiosError } from "../../services/http.service";
import { getRoomBooking } from "../../services/room.service";
import { RoomBooking } from "../../types/room-booking.type";

// Define a type for the slice state
export interface RoomBookingState {
    roomBooking: RoomBooking | null;
}

export const getRoomBookingThunk = createAsyncThunk<RoomBooking, void>(
    "room/getRoomBookingThunkStatus",
    async () => {
        try {
            const response = await getRoomBooking();
            return response.data;
        } catch (error: any) {
            let err: AxiosError<any> = error;
            if (!err.response) {
                throw error;
            }
            return err.response.data;
        }
    }
);

// กำหนด state เริ่มต้น
const initialState: RoomBookingState = {
    roomBooking: null,
};

export const roomBookingSlice = createSlice({
    name: "roomBooking",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getRoomBookingThunk.fulfilled,
            (state, action: PayloadAction<RoomBooking | null>) => {
                // กรณีใช้ global state
                state.roomBooking = action.payload;
            }
        );
    },
});
// export state
export const selectRoomBookingState = (state: RootState) => state.roomBookingState;

export default roomBookingSlice.reducer;

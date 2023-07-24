import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    getRoomBookingThunk,
    selectRoomBookingState,
} from "../../features/room/roomSlide";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { th } from "date-fns/locale";

const locales = {
    "th-TH": th,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function DashboardHome() {
    const dispatch = useAppDispatch();
    const { roomBooking } = useAppSelector(selectRoomBookingState);

    useEffect(() => {
        dispatch(getRoomBookingThunk());
    }, []);

    const onSelectEvent = (event: any) => {
        alert(JSON.stringify(event));
    };

    return (
        <>
            <Calendar
                culture="th-TH"
                localizer={localizer}
                events={[
                    ...(roomBooking?.events !== undefined
                        ? roomBooking.events
                        : []),
                ]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={onSelectEvent}
                views={["month", "agenda"]}
            />
        </>
    );
}

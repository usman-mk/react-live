export interface RoomBooking {
    events: Event[];
}

export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    created_by: string;
}

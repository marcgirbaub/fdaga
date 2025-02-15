import { calendar_v3 } from 'googleapis';

export type CalendarEvent = calendar_v3.Schema$Event;

export interface EventsResponse {
  data: {
    items?: CalendarEvent[];
  };
}

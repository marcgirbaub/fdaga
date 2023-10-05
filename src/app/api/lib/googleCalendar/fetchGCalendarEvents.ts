import { google } from 'googleapis';
import { googleCalendarCredentials } from './centredagatestCredentials';
import { CalendarEvent, EventsResponse } from './gCalendarTypes';
import { errorMessages } from '../../errors/errors';

export async function fetchGoogleCalendarEvents(): Promise<CalendarEvent[]> {
  const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const calendarClient = google.calendar({ version: 'v3' });
  const gCalendarScopes = 'https://www.googleapis.com/auth/calendar';

  const googleAuth = new google.auth.JWT(
    googleCalendarCredentials.client_email,
    '',
    googleCalendarCredentials.private_key,
    gCalendarScopes,
  );

  const eventsResponse: EventsResponse = await calendarClient.events.list({
    auth: googleAuth,
    calendarId: calendarId,
    timeMin: new Date().toISOString(),
    timeZone: 'Europe/Madrid',
  });

  if (!eventsResponse?.data?.items?.length) {
    throw new Error(errorMessages.NO_EVENTS_FOUND);
  }

  return eventsResponse.data.items;
}

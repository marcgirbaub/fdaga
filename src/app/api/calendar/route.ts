import { getCalendarEvents } from '@/app/api/lib/calendarUtilities';
import { NextResponse } from 'next/server';
import { getWeekSchedule } from '../db/configModel';
import { errorMessages } from '../errors/errors';
import { getNext30DaysSchedule } from '../services/calendarService';
import { google } from 'googleapis';
import { googleCalendarCredentials } from '../lib/googleCalendar/centredagatestCredentials';

export async function GET(request: Request, response: Response) {
  try {
    // const calendarEvents = await getCalendarEvents();
    // const weekSchedule = await getWeekSchedule();

    // getNext30DaysSchedule(calendarEvents, weekSchedule);

    const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID;
    const calendarClient = google.calendar({ version: 'v3' });
    const gCalendarScopes = 'https://www.googleapis.com/auth/calendar';

    const googleAuth = new google.auth.JWT(
      googleCalendarCredentials.client_email,
      '',
      googleCalendarCredentials.private_key,
      gCalendarScopes,
    );

    console.log('GETTING EVENTS........');

    let eventsResponse = await calendarClient.events.list({
      auth: googleAuth,
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
    });

    eventsResponse.data.items?.forEach((event) => {
      console.log(event.summary);
    });

    console.log(eventsResponse.data.items?.length);

    return NextResponse.json('This is working');
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        },
      );
    } else {
      return NextResponse.json(
        {
          error: errorMessages.UNEXPECTED_ERROR,
        },
        {
          status: 500,
        },
      );
    }
  }
}

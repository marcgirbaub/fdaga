import { NextResponse } from 'next/server';
import { getWeekSchedule } from '../db/configModel';
import { handleError } from '../errors/errors';

import { fetchGoogleCalendarEvents } from '../lib/googleCalendar/fetchGCalendarEvents';
import {
  calculateFreeHoursAndBooking,
  processEvents,
} from './helpers/calendarService';

export async function GET(request: Request, response: Response) {
  try {
    const events = await fetchGoogleCalendarEvents();

    const weekSchedule = await getWeekSchedule();

    const eventsByDay = processEvents(events);

    calculateFreeHoursAndBooking(eventsByDay, weekSchedule);

    return NextResponse.json(eventsByDay);
  } catch (error) {
    return handleError(error);
  }
}

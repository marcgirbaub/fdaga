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
    console.log(events);

    const weekSchedule = await getWeekSchedule();

    let dailyDetailMap = processEvents(events);

    dailyDetailMap = calculateFreeHoursAndBooking(dailyDetailMap, weekSchedule);

    return NextResponse.json(dailyDetailMap);
  } catch (error) {
    return handleError(error);
  }
}

import { getCalendarEvents } from '@/app/api/lib/calendarUtilities';
import { NextResponse } from 'next/server';
import { getWeekSchedule } from '../db/configModel';
import { errorMessages } from '../errors/errors';
import { getNext30DaysSchedule } from '../services/calendarService';

export async function GET(request: Request, response: Response) {
  try {
    const calendarEvents = await getCalendarEvents();
    const weekSchedule = await getWeekSchedule();

    getNext30DaysSchedule(calendarEvents, weekSchedule);

    return NextResponse.json('This is working');
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: errorMessages.UNEXPECTED_ERROR,
        },
        {
          status: 500,
        }
      );
    }
  }
}

import {
  CalendarEvent,
  EventsByDate,
  getCalendarEvents,
} from '@/app/api/lib/calendarUtilities';
import { NextResponse } from 'next/server';
import { getWeekSchedule } from '../db/configModel';
import { DailyWorkingHours } from '@/types/configModel';
import dayjs from 'dayjs';
import { get } from 'http';
import { DatabaseRequestError, errorMessages } from '../errors/errors';

function getBusyHoursOfDay(events: CalendarEvent[]): number[] {
  const busyHoursByEvent = events.map((event) => {
    const start = dayjs(event.start.dateTime).get('hour');
    const end = dayjs(event.end.dateTime).get('hour');

    const busyHours = [];

    for (let i = start; i < end; i++) {
      busyHours.push(i);
    }

    return busyHours;
  });

  const flatArray = busyHoursByEvent.reduce(
    (acc, currentArray) => acc.concat(currentArray),
    []
  );

  return flatArray;
}

function getDaySchedule(dayWorkingHours: number[], dayBusyHours: number[]) {
  const daySchedule: any = {};

  dayWorkingHours.forEach((hour) => {
    daySchedule[hour] = dayBusyHours.includes(hour) ? false : true;
  });

  const isAvailable = !dayWorkingHours.every((hour) =>
    dayBusyHours.includes(hour)
  );

  daySchedule.isAvailable = isAvailable;

  return daySchedule;
}

function getNext30DaysSchedule(
  calendarEvents: EventsByDate,
  weekSchedule: DailyWorkingHours[]
) {
  const next30DaysSchedule = [];

  Object.entries(calendarEvents).forEach(([day, dayEvents]) => {
    const dayBusyHours = getBusyHoursOfDay(dayEvents);

    const dayWorkingHours = weekSchedule.find(
      (schedule) => schedule.dayOfWeek === dayjs(day).day()
    );

    if (dayWorkingHours) {
      const daySchedule = getDaySchedule(
        dayWorkingHours.workingHours,
        dayBusyHours
      );

      daySchedule.date = day;
      console.log(daySchedule);
    }
  });

  return;
}

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

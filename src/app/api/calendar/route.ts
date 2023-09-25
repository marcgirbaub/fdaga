import { NextResponse } from 'next/server';
import { getWeekSchedule } from '../db/configModel';
import { errorMessages } from '../errors/errors';
import { google, calendar_v3 } from 'googleapis';
import { googleCalendarCredentials } from '../lib/googleCalendar/centredagatestCredentials';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DayOfWeek, WorkingHourSlot } from '@/types/configModel';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type CalendarEvent = calendar_v3.Schema$Event;

interface EventsResponse {
  data: {
    items?: CalendarEvent[];
  };
}

function isInNext30Days(date: dayjs.Dayjs): boolean {
  const today = dayjs();
  const thirtyDaysLater = today.add(30, 'day');
  return date.isSameOrAfter(today) && date.isSameOrBefore(thirtyDaysLater);
}

function generateRecurringEvents(event: CalendarEvent): CalendarEvent[] {
  const instances: CalendarEvent[] = [];
  if (event.recurrence) {
    const recurrence = event.recurrence[0];
    const bydayMatch = recurrence.match(/BYDAY=([A-Z,]+)/);

    if (bydayMatch) {
      const days = bydayMatch[1].split(',').map((day) => day.toUpperCase());
      let currentDate = dayjs(event?.start?.dateTime);

      while (isInNext30Days(currentDate)) {
        if (days.includes(currentDate.format('dd').toUpperCase())) {
          const newInstance = { ...event };
          newInstance.start = { ...(newInstance.start || {}) };
          newInstance.start.dateTime = currentDate.toISOString();
          newInstance.end = { ...(newInstance.end || {}) };
          newInstance.end.dateTime = currentDate
            .add(
              dayjs(event.end?.dateTime).hour() -
                dayjs(event.start?.dateTime).hour(),
              'hour',
            )
            .toISOString();

          instances.push(newInstance);
        }
        currentDate = currentDate.add(1, 'day');
      }
    }
  }
  return instances;
}

function isHourBooked(hour: number, eventsForDay: CalendarEvent[]): boolean {
  return eventsForDay.some((event) => {
    const startHour = dayjs(event.start?.dateTime).hour();
    const endHour = dayjs(event.end?.dateTime).hour();
    return hour >= startHour && hour < endHour;
  });
}

export async function GET(request: Request, response: Response) {
  try {
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
    });

    const events = eventsResponse.data.items || [];

    if (!events.length) {
      return NextResponse.json(
        {
          error: errorMessages.NO_EVENTS_FOUND,
        },
        {
          status: 404,
        },
      );
    }

    const weekSchedule = await getWeekSchedule();

    const eventsByDay: {
      [date: string]: {
        events: CalendarEvent[];
        isFullyBooked: boolean;
        freeHours: any;
      };
    } = {};

    events.forEach((event) => {
      if (event.recurrence) {
        const recurringEvents = generateRecurringEvents(event);

        recurringEvents.forEach((recurringEvent) => {
          const dateKey = dayjs(recurringEvent.start?.dateTime).format(
            'YYYY-MM-DD',
          );
          if (!eventsByDay[dateKey])
            eventsByDay[dateKey] = {
              events: [],
              isFullyBooked: false,
              freeHours: [],
            };
          eventsByDay[dateKey].events.push(recurringEvent);
        });
      } else {
        const dateKey = dayjs(event.start?.dateTime).format('YYYY-MM-DD');
        if (!eventsByDay[dateKey])
          eventsByDay[dateKey] = {
            events: [],
            isFullyBooked: false,
            freeHours: [],
          };
        eventsByDay[dateKey].events.push(event);
      }
    });

    Object.keys(eventsByDay).forEach((dateKey) => {
      const dayOfWeek = dayjs(dateKey).day() as DayOfWeek;
      const workingHoursForDay =
        weekSchedule.find((schedule) => schedule.dayOfWeek === dayOfWeek)
          ?.workingHours || [];

      const freeHoursForDay: WorkingHourSlot[] = [];
      workingHoursForDay.forEach((hourSlot) => {
        for (let hour = hourSlot.start; hour < hourSlot.end; hour++) {
          if (!isHourBooked(hour, eventsByDay[dateKey].events)) {
            // Push this hour as a free slot
            if (
              freeHoursForDay.length > 0 &&
              freeHoursForDay[freeHoursForDay.length - 1].end === hour
            ) {
              // If the last slot's end time is this hour, extend the last slot
              freeHoursForDay[freeHoursForDay.length - 1].end++;
            } else {
              // Otherwise, start a new slot
              freeHoursForDay.push({ start: hour, end: hour + 1 });
            }
          }
        }
      });

      eventsByDay[dateKey].freeHours = freeHoursForDay;
      eventsByDay[dateKey].isFullyBooked =
        freeHoursForDay.length === 0 ||
        freeHoursForDay.reduce(
          (acc, slot) => acc + (slot.end - slot.start),
          0,
        ) === 0;
    });

    return NextResponse.json(eventsByDay);
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

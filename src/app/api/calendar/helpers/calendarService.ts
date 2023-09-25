import { CalendarEvent } from '../../lib/googleCalendar/gCalendarTypes';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import cloneDeep from 'lodash/cloneDeep';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  DailyWorkingHours,
  DayOfWeek,
  WorkingHourSlot,
} from '@/types/configModel';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

function isInNext30Days(date: dayjs.Dayjs): boolean {
  const today = dayjs();
  const thirtyDaysLater = today.add(30, 'day');
  return date.isSameOrAfter(today) && date.isSameOrBefore(thirtyDaysLater);
}

function isHourBooked(hour: number, eventsForDay: CalendarEvent[]): boolean {
  return eventsForDay.some((event) => {
    const timeZone = event.start?.timeZone || 'Europe/Madrid';
    const startHour = dayjs(event.start?.dateTime)
      .tz(timeZone)
      .hour();
    const endHour = dayjs(event.end?.dateTime)
      .tz(timeZone)
      .hour();
    return hour >= startHour && hour < endHour;
  });
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

export interface DailyDetailsMap {
  [date: string]: {
    events: CalendarEvent[];
    isFullyBooked: boolean;
    freeHours: WorkingHourSlot[];
  };
}

export function processEvents(events: CalendarEvent[]) {
  const eventsByDay: DailyDetailsMap = {};

  events.forEach((event) => {
    const eventsToProcess = event.recurrence
      ? generateRecurringEvents(event)
      : [event];

    eventsToProcess.forEach((evt) => {
      const dateKey = dayjs(evt.start?.dateTime).format('YYYY-MM-DD');
      if (!eventsByDay[dateKey]) {
        eventsByDay[dateKey] = {
          events: [],
          isFullyBooked: false,
          freeHours: [],
        };
      }
      eventsByDay[dateKey].events.push(evt);
    });
  });

  return eventsByDay;
}

export function generateFreeHoursForDay(
  workingHoursForDay: WorkingHourSlot[],
  events: CalendarEvent[],
) {
  const freeHoursForDay: WorkingHourSlot[] = [];

  workingHoursForDay.forEach((hourSlot) => {
    let currentSlot: WorkingHourSlot | null = null;
    for (let hour = hourSlot.start; hour < hourSlot.end; hour++) {
      if (!isHourBooked(hour, events)) {
        if (currentSlot) {
          currentSlot.end = hour + 1;
        } else {
          currentSlot = { start: hour, end: hour + 1 };
          freeHoursForDay.push(currentSlot);
        }
      } else {
        currentSlot = null;
      }
    }
  });

  return freeHoursForDay;
}

export function calculateFreeHoursAndBooking(
  eventsByDay: DailyDetailsMap,
  weekSchedule: DailyWorkingHours[],
) {
  const newEventsByDay: DailyDetailsMap = cloneDeep(eventsByDay);

  Object.keys(newEventsByDay).forEach((dateKey) => {
    const dayOfWeek = dayjs(dateKey).day() as DayOfWeek;
    const workingHoursForDay =
      weekSchedule.find((schedule) => schedule.dayOfWeek === dayOfWeek)
        ?.workingHours || [];

    const freeHoursForDay: WorkingHourSlot[] = generateFreeHoursForDay(
      workingHoursForDay,
      newEventsByDay[dateKey].events,
    );

    newEventsByDay[dateKey].freeHours = freeHoursForDay;
    newEventsByDay[dateKey].isFullyBooked =
      freeHoursForDay.length === 0 ||
      freeHoursForDay.reduce(
        (acc, slot) => acc + (slot.end - slot.start),
        0,
      ) === 0;
  });

  return newEventsByDay;
}

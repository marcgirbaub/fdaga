import dayjs from 'dayjs';
import { DailyWorkingHours } from '../db/configModel';
import { CalendarEvent, EventsByDate } from '../lib/calendarUtilities';

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

export function getNext30DaysSchedule(
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

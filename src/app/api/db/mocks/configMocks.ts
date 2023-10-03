import { DailyWorkingHours, DayOfWeek } from '@/types/configModel';

export const weekScheduleMock: DailyWorkingHours[] = [
  {
    dayOfWeek: DayOfWeek.Monday,
    workingHours: [{ start: 12, end: 21 }],
  },
  {
    dayOfWeek: DayOfWeek.Tuesday,
    workingHours: [{ start: 12, end: 21 }],
  },
  {
    dayOfWeek: DayOfWeek.Wednesday,
    workingHours: [{ start: 12, end: 21 }],
  },
  {
    dayOfWeek: DayOfWeek.Thursday,
    workingHours: [{ start: 12, end: 21 }],
  },
  {
    dayOfWeek: DayOfWeek.Friday,
    workingHours: [{ start: 12, end: 21 }],
  },
];

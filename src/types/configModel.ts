export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface WorkingHourSlot {
  start: number;
  end: number;
}

export interface DailyWorkingHours {
  dayOfWeek: DayOfWeek;
  workingHours: WorkingHourSlot[];
}

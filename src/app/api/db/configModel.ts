import { weekScheduleMock } from './mocks/configMocks';

export interface DailyWorkingHours {
  dayOfWeek: number;
  workingHours: number[];
}

export const getSchedule = async () => {
  try {
    const response: DailyWorkingHours[] = weekScheduleMock;

    return response;
  } catch (error) {
    throw new Error('Error getting schedule');
  }
};

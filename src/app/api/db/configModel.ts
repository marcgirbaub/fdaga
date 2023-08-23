import { DatabaseRequestError } from '../errors/errors';
import { weekScheduleMock } from './mocks/configMocks';

export interface DailyWorkingHours {
  dayOfWeek: number;
  workingHours: number[];
}

export const getWeekSchedule = async () => {
  try {
    const response: DailyWorkingHours[] = weekScheduleMock;

    // This reads from DB

    return response;
  } catch (error) {
    const errorMsg = 'Error getting schedule';
    throw new DatabaseRequestError(errorMsg);
  }
};

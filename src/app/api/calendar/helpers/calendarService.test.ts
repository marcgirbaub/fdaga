import dayjs from 'dayjs';
import { isDayInReservationRange } from './calendarService';

jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  const mockedDayjs = (date?: any) => {
    return date ? actualDayjs(date) : actualDayjs('2023-09-27T12:00:00Z'); // Mocking today's date
  };
  mockedDayjs.extend = actualDayjs.extend; // Include 'extend' function in your mock
  return mockedDayjs;
});

import dayjs from 'dayjs';
import { isInNext30Days } from './calendarService';

jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  const mockedDayjs = (date?: any) => {
    return date ? actualDayjs(date) : actualDayjs('2023-09-27T12:00:00Z'); // Mocking today's date
  };
  mockedDayjs.extend = actualDayjs.extend; // Include 'extend' function in your mock
  return mockedDayjs;
});

describe('Given a isInNext30Days function', () => {
  describe('When called with a date within the next 30 days', () => {
    test('Then should return true', () => {
      // Given
      const testDate = dayjs().add(10, 'day');

      // When
      const result = isInNext30Days(testDate);

      // Then
      expect(result).toBe(true);
    });
  });

  describe('When called with a date beyond the next 30 days', () => {
    test('Then should return false', () => {
      // Given
      const testDate = dayjs().add(31, 'day');

      // When
      const result = isInNext30Days(testDate);

      // Then
      expect(result).toBe(false);
    });
  });
});

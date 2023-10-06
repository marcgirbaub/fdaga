import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Autocomplete, TextField } from '@mui/material';
import { formFlexGapY } from '../styleClassNames';
import { useTranslations } from 'next-intl';
import { DayOfWeek } from '@/types/configModel';
import { DATE_RESERVATION_RANGE } from '@/constants/calendarConstants';
import { DailyDetailsMap } from '@/app/api/calendar/helpers/calendarService';
import { ReserveFormState } from '../ReserveForm';

interface DateAndTimeSelectorProps {
  isLoading: boolean;
  disabledDates: string[];
  dailyDetailsMap?: DailyDetailsMap;
  formState: ReserveFormState;
  setFormState: React.Dispatch<React.SetStateAction<ReserveFormState>>;
}

const timeSelectorHourRanges = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
];

const formatHourRange = (hourRange: string) => {
  const [startHour, endHour] = hourRange.split('-');

  return `${startHour} - ${endHour}`;
};

const DateAndTimeSelector: FC<DateAndTimeSelectorProps> = ({
  disabledDates,
  isLoading,
  dailyDetailsMap = {},
  formState,
  setFormState,
}) => {
  const t = useTranslations();

  const handleDisableDate = (date: Dayjs) => {
    // Check if it's weekend
    const dayOfWeek = dayjs(date).day();

    if (dayOfWeek === DayOfWeek.Sunday || dayOfWeek === DayOfWeek.Saturday) {
      return true;
    }

    // Check if it's inside reservation range
    const todayPlusReservationRange = dayjs().add(
      DATE_RESERVATION_RANGE,
      'day',
    );

    if (dayjs(date).isAfter(todayPlusReservationRange)) {
      return true;
    }

    // Check if it's a disabled date
    const parsedDate = date.toISOString().split('T')[0];
    const parsedDisabledDates = disabledDates.map((date) => {
      return dayjs(date).toISOString().split('T')[0];
    });

    return parsedDisabledDates.includes(parsedDate);
  };

  const getOccupiedHoursForSelectedDate = () => {
    const occupiedHours = [];
    for (let i = 8; i < 21; i++) {
      let isFree = false;

      const currentDate = dayjs(formState.date).toISOString().split('T')[0];

      if (!currentDate) return [];

      for (const freeHour of dailyDetailsMap[currentDate]?.freeHours || []) {
        if (i >= freeHour.start && i < freeHour.end) {
          isFree = true;
          break;
        }
      }
      if (!isFree) {
        occupiedHours.push(
          `${String(i).padStart(2, '0')}:00-${String(i + 1).padStart(
            2,
            '0',
          )}:00`,
        );
      }
    }
    return occupiedHours;
  };

  const handleChangeDate = (date: Dayjs | null) => {
    setFormState((prevState) => ({
      ...prevState,
      date: dayjs(date),
    }));
  };

  console.log('formState.date', formState.date.toDate());

  return (
    <div className={`w-full flex flex-col ${formFlexGapY}`}>
      <DatePicker
        label={t('reserveFormDate')}
        disablePast
        shouldDisableDate={handleDisableDate}
        renderLoading={() => <p>Loading...</p>}
        loading={isLoading}
        value={formState.date}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
          },
        }}
        onChange={handleChangeDate}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={timeSelectorHourRanges}
        getOptionDisabled={(option) =>
          getOccupiedHoursForSelectedDate().includes(option)
        }
        renderInput={(params) => (
          <TextField {...params} label="Hour" size="small" />
        )}
      />
    </div>
  );
};

export default DateAndTimeSelector;

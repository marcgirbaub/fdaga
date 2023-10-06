import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { formFlexGapY } from '../styleClassNames';
import { useTranslations } from 'next-intl';
import { DayOfWeek } from '@/types/configModel';
import { DATE_RESERVATION_RANGE } from '@/constants/calendarConstants';

interface DateAndTimeSelectorProps {
  isLoading: boolean;
  disabledDates: string[];
}

const timeSelectorHourRanges = [
  '08:00-09:00',
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
}) => {
  const t = useTranslations();

  const handleDisableDate = (date: Date) => {
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

  const handleChangeDate = (date: Date | null) => {
    console.log(date);
  };

  return (
    <div className={`w-full flex flex-col ${formFlexGapY}`}>
      <DatePicker
        label={t('reserveFormDate')}
        disablePast
        shouldDisableDate={handleDisableDate}
        renderLoading={() => <p>Loading...</p>}
        loading={isLoading}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
          },
        }}
        onChange={handleChangeDate}
      />

      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          {t('reserveFormTime')}
        </InputLabel>

        <Select
          labelId="time-selector-label"
          label={t('reserveFormTime')}
          fullWidth
          size="small"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Set this to an appropriate value
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          {timeSelectorHourRanges.map((hourRange) => {
            return (
              <MenuItem key={hourRange} value={hourRange}>
                {formatHourRange(hourRange)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={timeSelectorHourRanges}
        renderInput={(params) => (
          <TextField {...params} label="Hour" size="small" />
        )}
      />
    </div>
  );
};

export default DateAndTimeSelector;

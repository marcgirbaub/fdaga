import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { MenuItem, Select, TextField, styled } from '@mui/material';

const StyledDatePicker = styled(DatePicker)``;

interface DateAndTimeSelectorProps {}

const DateAndTimeSelector: FC<DateAndTimeSelectorProps> = () => {
  const disabledDates = ['2023-08-22', '2023-08-25', '2023-08-27'];

  const handleDisableDate = (date: Date) => {
    const parsedDate = date.toISOString().split('T')[0];
    const parsedDisabledDates = disabledDates.map((date) => {
      return dayjs(date).toISOString().split('T')[0];
    });

    return parsedDisabledDates.includes(parsedDate);
  };

  return (
    <div>
      <DatePicker
        disablePast
        shouldDisableDate={handleDisableDate}
        renderLoading={() => <p>Loading...</p>}
        loading={false}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
          },
        }}
      />
      <Select fullWidth size="small">
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
    </div>
  );
};

export default DateAndTimeSelector;

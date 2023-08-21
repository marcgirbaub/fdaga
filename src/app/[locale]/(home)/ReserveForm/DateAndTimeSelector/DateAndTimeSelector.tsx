import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';
import { formFlexGapY } from '../styleClassNames';

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
    <div className={`w-full flex flex-col ${formFlexGapY}`}>
      <DatePicker
        label="Date"
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          Hour
        </InputLabel>

        <Select
          labelId="time-selector-label"
          label="Hour"
          fullWidth
          size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DateAndTimeSelector;

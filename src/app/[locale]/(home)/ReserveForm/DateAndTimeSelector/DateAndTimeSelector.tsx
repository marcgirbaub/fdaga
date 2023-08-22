import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { formFlexGapY } from '../styleClassNames';
import { useTranslations } from 'next-intl';

const DateAndTimeSelector: FC = () => {
  const t = useTranslations();
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
        label={t('reserveFormDate')}
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
          {t('reserveFormTime')}
        </InputLabel>

        <Select
          labelId="time-selector-label"
          label={t('reserveFormTime')}
          fullWidth
          size="small"
        >
          <MenuItem value={10}>8 - 9</MenuItem>
          <MenuItem value={10}>9 - 10</MenuItem>
          <MenuItem value={10}>10 - 11</MenuItem>
          <MenuItem value={10}>11 - 12</MenuItem>
          <MenuItem value={10}>12 - 13</MenuItem>
          <MenuItem value={10}>15 - 16</MenuItem>
          <MenuItem value={10}>16 - 17</MenuItem>
          <MenuItem value={10}>17 - 18</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DateAndTimeSelector;

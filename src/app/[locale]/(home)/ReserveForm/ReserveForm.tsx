import { Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import DateAndTimeSelector from './DateAndTimeSelector/DateAndTimeSelector';
import { formFlexGapY } from './styleClassNames';
import useReserveFormData from './useReserveFormData';
import { DailyDetailsMap } from '@/app/api/calendar/helpers/calendarService';

function getUnavailableDates(data: DailyDetailsMap | undefined) {
  const unavailableDates = [];

  for (const date in data) {
    const dayData = data[date];
    const isFullyBooked = dayData.isFullyBooked;
    const hasNoFreeHours = dayData.freeHours.length === 0;

    if (isFullyBooked || hasNoFreeHours) {
      unavailableDates.push(date);
    }
  }

  return unavailableDates;
}

const ReserveForm: FC = () => {
  const t = useTranslations();

  console.count('rendering ReserveForm');

  const { data, isLoading, isFetching, isError } = useReserveFormData();

  const unavailableDates = getUnavailableDates(data);

  console.log(unavailableDates);

  return (
    <div
      className={`w-full bg-white/75 rounded-md p-4 flex flex-col items-center ${formFlexGapY}`}
    >
      <h1 className="text-black text-center">{t('reserveFormTitle')}</h1>
      <form
        className={`w-full px-8 flex flex-col items-center ${formFlexGapY}`}
      >
        <DateAndTimeSelector
          disabledDates={unavailableDates}
          isLoading={isLoading || isFetching}
        />

        <TextField fullWidth size="small" label="name" name="name" required />
        <TextField fullWidth size="small" label="email" name="email" required />
        <TextField fullWidth size="small" label="comments" name="comments" />

        <Button variant="contained"> {t('reserveFormCTA')}</Button>
      </form>
    </div>
  );
};

export default ReserveForm;

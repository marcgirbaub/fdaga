import { Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import DateAndTimeSelector from './DateAndTimeSelector/DateAndTimeSelector';

interface ReserveFormProps {}

const ReserveForm: FC<ReserveFormProps> = () => {
  const t = useTranslations();

  return (
    <div className="w-full bg-white/75 rounded-md p-4 flex flex-col items-center gap-y-6">
      <h1>{t('reserveFormTitle')}</h1>
      <form className="w-full px-8 flex flex-col items-center gap-y-6">
        <DateAndTimeSelector />
        <TextField fullWidth size="small" label="name" name="name" required />
        <TextField fullWidth size="small" label="email" name="email" required />
        <TextField fullWidth size="small" label="comments" name="comments" />

        <Button variant="contained"> {t('reserveFormCTA')}</Button>
      </form>
    </div>
  );
};

export default ReserveForm;

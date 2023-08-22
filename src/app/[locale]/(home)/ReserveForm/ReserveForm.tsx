import { Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

interface ReserveFormProps {}

const ReserveForm: FC<ReserveFormProps> = () => {
  const t = useTranslations();

  return (
    <div className="w-full bg-white/75 rounded-md p-4 flex flex-col items-center gap-y-6">
      <h1>{t('reserveFormTitle')}</h1>
      <form className="w-full flex flex-col items-center gap-y-6">
        <TextField size="small" label="name" name="name" required />
        <TextField size="small" label="email" name="email" required />
        <TextField size="small" label="comments" name="comments" />
        <TextField size="small" label="name" name="name" />
        <Button variant="contained"> {t('reserveFormCTA')}</Button>
      </form>
    </div>
  );
};

export default ReserveForm;

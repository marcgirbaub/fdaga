import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

interface ReserveFormProps {}

const ReserveForm: FC<ReserveFormProps> = () => {
  const t = useTranslations();
  return <div>{t('reserveFormTitle')}</div>;
};

export default ReserveForm;

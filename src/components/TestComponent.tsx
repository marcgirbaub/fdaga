import React from 'react';
import { useTranslations } from 'next-intl';

const TestComponent = () => {
  const t = useTranslations();

  return <div className="text-3xl">{t('test')}</div>;
};

export default TestComponent;

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';

const TestComponent = () => {
  const t = useTranslations();

  return (
    <div>
      <Button variant="contained" className="text-3xl">
        {t('test')}
      </Button>
    </div>
  );
};

export default TestComponent;

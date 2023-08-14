import React from 'react';
import styles from './styles.module.css';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const TestComponent = () => {
  const t = useTranslations();

  return (
    <div className={styles.testComponent}>
      <Button variant="contained">{t('test')}</Button>
    </div>
  );
};

export default TestComponent;

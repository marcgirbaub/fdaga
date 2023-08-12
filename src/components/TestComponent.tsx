import React from 'react';
import styles from './styles.module.css';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TestComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.testComponent}>
      <Button variant="contained">{t('test')}</Button>
    </div>
  );
};

export default TestComponent;

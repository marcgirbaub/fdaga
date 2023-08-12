import React from 'react';
import styles from './styles.module.css';
import { Button } from '@mui/material';

const TestComponent = () => {
  return (
    <div className={styles.testComponent}>
      <Button variant="contained">a test</Button>
    </div>
  );
};

export default TestComponent;

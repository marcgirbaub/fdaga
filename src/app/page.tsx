'use client';

import styles from './page.module.css';
import TestComponent from '@/components/TestComponent';
import React from 'react';
import '../i18n/i18n';

export default function Home() {
  return (
    <main className={styles.main}>
      <TestComponent />
    </main>
  );
}

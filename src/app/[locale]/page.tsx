'use client';

import CenterMap from '@/components/CenterMap/CenterMap';
import styles from './page.module.css';
import TestComponent from '@/components/TestComponent';
import React from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <TestComponent />
      <CenterMap />
    </main>
  );
}

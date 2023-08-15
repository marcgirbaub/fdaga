'use client';

import styles from './page.module.css';
import TestComponent from '@/components/TestComponent';
import React from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <TestComponent />

      <iframe
        width="600"
        height="450"
        loading="lazy"
        style={{ border: 0, width: '100%' }}
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}
          &q=Passeig+de+la+Ribera,+53,+08420+Canovelles,+Barcelona/@41.6195909,2.2832172,17z`}
      ></iframe>
    </main>
  );
}

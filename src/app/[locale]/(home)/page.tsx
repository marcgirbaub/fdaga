'use client';

import CenterMap from '@/components/CenterMap/CenterMap';
import PageContainer from '@/components/PageContainer/PageContainer';
import TestComponent from '@/components/TestComponent';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReserveForm from './ReserveForm/ReserveForm';

export default function Home() {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className="w-full h-screen bg-landing-bg bg-center bg-no-repeat bg-cover pt-20 -mt-20 bg-red overflow-y-auto">
        <div className="w-full h-screen backdrop-opacity-95 bg-white/50 -mt-20 pt-24 p-6 pb-0 flex flex-col items-center gap-y-8">
          <h1 className="text-gray-700">{t('homeTitle')}</h1>
          <ReserveForm />
        </div>
        <TestComponent />
        <CenterMap />
      </div>
    </PageContainer>
  );
}

'use client';

import CenterMap from '@/components/CenterMap/CenterMap';
import PageContainer from '@/components/PageContainer/PageContainer';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReserveForm from './ReserveForm/ReserveForm';
import ServiceCard, { Backgrounds } from './ServiceCard/ServiceCard';

export default function Home() {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className="w-full h-screen overflow-y-auto">
        <section className="w-full flex flex-col p-8 items-center gap-y-8 main-bg-gradient">
          <h1 className="text-slate-50 text-center">{t('homeTitle')}</h1>
          <ReserveForm />
        </section>
        <section className="w-full flex flex-col p-8 items-center gap-y-8 bg-gray-100">
          <h2>{t('servicesTitle')}</h2>
          <ServiceCard
            title={t('physiotherapyTitle')}
            description={t('physiotherapyDescription')}
            background={Backgrounds.physiotherapy}
          />
          <ServiceCard
            title={t('dryNeedlingTitle')}
            description={t('dryNeedlingDescription')}
            background={Backgrounds.dryNeedling}
          />
          <ServiceCard
            title={t('physiotherapyTitle')}
            description={t('physiotherapyDescription')}
            background={Backgrounds.physiotherapy}
          />
        </section>
        <CenterMap />
      </div>
    </PageContainer>
  );
}

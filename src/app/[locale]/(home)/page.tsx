'use client';

import CenterMap from '@/components/CenterMap/CenterMap';
import PageContainer from '@/components/PageContainer/PageContainer';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReserveForm from './ReserveForm/ReserveForm';
import ServiceCard, { Backgrounds } from './ServiceCard/ServiceCard';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations();

  return (
    <PageContainer>
      <section className="w-full flex flex-col p-8 items-center gap-y-8 main-bg-gradient">
        <h1 className="text-slate-50 text-center">{t('homeTitle')}</h1>
        <ReserveForm />
      </section>
      <section className="w-full flex flex-col p-8 items-center gap-y-8 bg-lightGray">
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
          title={t('deportivePhysiotherapyTitle')}
          description={t('deportivePhysiotherapyDescription')}
          background={Backgrounds.deportivePhysiotherapy}
        />
      </section>
      <section className="w-full flex flex-col p-8 items-center gap-y-4 bg-darkBlue text-white">
        <h2>{t('theCenterTitle')}</h2>
        <p>{t('nilName')}</p>
        <img src="langui.jpg" className="w-full" alt="nil fisioterapeuta" />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p>{t('whereAreWe')}</p>
          <address className="text-xs">{t('centerAddress')}</address>
        </div>
      </section>

      <CenterMap />
    </PageContainer>
  );
}

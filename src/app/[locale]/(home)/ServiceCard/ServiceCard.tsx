import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export enum Backgrounds {
  physiotherapy = 'bg-services-bg-physioterapy',
  dryNeedling = 'bg-services-bg-dry-needling',
  deportivePhysiotherapy = 'bg-services-bg-deportive-physioterapy',
  default = 'bg-yellow-500',
}

interface ServiceCardProps {
  title: string;
  description: string;
  background: Backgrounds;
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  background = Backgrounds.default,
}) => {
  const t = useTranslations();

  return (
    <div
      className={`w-full  h-48 bg-darkBlue bg-cover bg-no-repeat ${background}`}
    >
      <div className="w-full h-full bg-black/40 flex flex-col gap-4 items-center p-6">
        <h3 className="text-slate-50 text-2xl">{t(title)}</h3>
        <p className="text-slate-50 text-lg">{t(description)}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

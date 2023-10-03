import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export enum Backgrounds {
  physiotherapy = 'services-bg-physioterapy',
  dryNeedling = 'services-bg-dry-needling',
  massage = 'bg-green-500',
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
    <div className={`w-full  h-48 bg-cover bg-no-repeat bg-${background}`}>
      <div className="w-full h-full bg-black/20 flex flex-col gap-4 items-center p-6">
        <h3 className="text-slate-50 text-2xl">{t(title)}</h3>
        <p className="text-slate-50 text-lg">{t(description)}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

const CenterMap: FC = () => {
  const t = useTranslations();

  return (
    <div className="w-screen flex flex-col items-center gap-y-4 bg-lightGray">
      <iframe
        loading="lazy"
        height={200}
        style={{ border: 0, width: '100%' }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          &q=Passeig+de+la+Ribera,+53,+08420+Canovelles,+Barcelona/@41.6195909,2.2832172,17z`}
      ></iframe>

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=Passeig+de+la+Ribera,+53,+08420+Canovelles,+Barcelona"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center w-full text-white py-2 w-fit px-4 rounded-full no-underline bg-lightBlue"
      >
        {t('getDirections')}
      </a>
    </div>
  );
};

export default CenterMap;

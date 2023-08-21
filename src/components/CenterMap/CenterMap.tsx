import React, { FC } from 'react';

const CenterMap: FC = () => {
  return (
    <div style={{ width: '100vw' }}>
      <iframe
        loading="lazy"
        height={200}
        style={{ border: 0, width: '100%' }}
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          &q=Passeig+de+la+Ribera,+53,+08420+Canovelles,+Barcelona/@41.6195909,2.2832172,17z`}
      ></iframe>
    </div>
  );
};

export default CenterMap;

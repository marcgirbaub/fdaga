import CenterMap from '@/components/CenterMap/CenterMap';

import TestComponent from '@/components/TestComponent';
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center min-h-screen bg-black">
      <div className="w-full bg-white p-6 flex flex-col items-center bg-landing-bg">
        asdasd
      </div>
      <TestComponent />
      <CenterMap />
    </main>
  );
}

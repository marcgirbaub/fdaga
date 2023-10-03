import React, { FC } from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <main className="flex flex-col justify-between items-center min-h-screen bg-white">
      {children}
    </main>
  );
};

export default PageContainer;

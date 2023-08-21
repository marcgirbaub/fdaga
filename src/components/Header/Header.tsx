import React, { FC } from 'react';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="w-full bg-red h-20 p-6 flex items-center justify-between bg-transparent absolute top-0 z-50">
      Fisio daga
      <span>lang</span>
    </header>
  );
};

export default Header;

import React, { FC } from 'react';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="w-full h-16 p-6 flex items-center justify-between">
      Fisio daga
      <span>lang</span>
    </header>
  );
};

export default Header;

import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="bg-success-subtle ">
        <Navbar/>
      </header>
      <main className="container mt-2">
        {children}
      </main>
    </>
  );
};

export default Layout;
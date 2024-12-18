import React from 'react';
import './Layout.css'; 
import logo from '../assets/logo.png'; 

interface LayoutProps {
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {}
      <header className="layout-header">
        <img src={logo} alt="Logo" className="layout-logo" />
      </header>

      {}
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
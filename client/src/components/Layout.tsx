import React from 'react';
import './Layout.css'; // Style for the background and layout
import logo from '../assets/logo.png'; // Adjust the path to your logo file

interface LayoutProps {
  children: React.ReactNode; // Children will be the page content
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* Logo Section */}
      <header className="layout-header">
        <img src={logo} alt="Logo" className="layout-logo" />
      </header>

      {/* Content Section */}
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
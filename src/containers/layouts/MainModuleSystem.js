import React from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer';
import SidebarSystem from '../common/SidebarSystem/SidebarSystem';

const MainModuleSystem = ({ children }) => {
  return <div>
    <Header />
    <SidebarSystem />
    <div id="main">
      {children} 
    </div>
    <Footer />
  </div>
};

export default MainModuleSystem;

import React from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';

const MainAdmin = ({ children }) => {
  return <div>
    <Header />
    <Sidebar />
    <div id="main">
      {children}
    </div>
    <Footer />
  </div>
};

export default MainAdmin;
import React from 'react';
import Header from '../common/Header/Header';
import SidebarAccount from '../common/SidebarAccount/SidebarAccount';

const MainAcount = ({ children }) => {
  return (
    <div>
      <Header />
      <div id="main-user">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SidebarAccount />
            </div>
            <div className="col-md-9">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainAcount;

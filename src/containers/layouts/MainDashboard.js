import React from 'react';
import Header from '../common/Header/Header';
import SidebarDashboard from '../common/SidebarDashBoard/SidebarDashBoard';
const MainDashboard = (props) => {

  return (
      <div>
        <Header parent={props.parent}/>
        <SidebarDashboard />
        <div id="main">
          {props.children}
        </div>
      </div>
  )

};

export default MainDashboard;


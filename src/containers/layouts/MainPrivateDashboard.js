import React from 'react';
import Header from '../common/Header/Header';
import SidebarPrivate from '../common/SidebarPrivate/SidebarPrivate';

const MainPrivateDashboard = (props) => {
  return <div>
    <Header parent = {props.parent} />
    <SidebarPrivate parent = {props.parent} baseParam = {props.baseParam} />
    <div id="main">
      {props.children} 
    </div>
  </div>
};

export default MainPrivateDashboard;


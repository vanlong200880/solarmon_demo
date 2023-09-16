import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(({ location, ...props }) => {
  const isActive = location.pathname === props.to;
  var className = isActive ? 'active' : '';
  return (
    <Link className={className} to = {props.to}>
      {props.children}
    </Link>
  );
});
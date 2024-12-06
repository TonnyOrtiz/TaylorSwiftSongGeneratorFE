import React from 'react';

const SideMenuButton = ({ onClick, children }) => {
  return (
    <div className="side-menu-button" onClick={onClick}>
      <span>+</span> {children}
    </div>
  );
};

export default SideMenuButton;

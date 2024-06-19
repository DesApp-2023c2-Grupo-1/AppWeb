import React from 'react';
import { FaRobot } from 'react-icons/fa';
import './styles.css';

const Header = () => {
  return (
    <header className="header">
      <FaRobot className="header-icon" />
      <div className="header-content">
        <h1 className="header-title">Z-R0 Web</h1>
        <p className="header-subtitle">Controla tu robot y explora el tablero.</p>
      </div>
      <FaRobot className="header-icon" />
    </header>
  );
};

export default Header;

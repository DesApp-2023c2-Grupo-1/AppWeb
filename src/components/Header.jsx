import React from 'react';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
  return (
    <header style={{
      backgroundColor: 'rgba(41, 191, 199, 0.7)',
      justifyContent: 'space-between',
      padding: '10px',
      textAlign: 'center',
      alignItems: 'center',
      color: 'white',
      display: 'flex',
      fontFamily: 'Arial, sans-serif'
    }}>
      <FaRobot style={{ fontSize: '2.5em' }} />
      <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '1.8em', margin: 0, fontFamily: 'Arial, sans-serif' }}>Z-R0 Web</h1>
        <p style={{ fontSize: '1.25em', margin: 0, fontFamily: 'Arial, sans-serif' }}>Controla tu robot y explora el tablero.</p>
      </div>
      <FaRobot style={{ fontSize: '2.5em' }} />
    </header>
  );
};

export default Header;
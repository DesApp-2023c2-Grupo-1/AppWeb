import React from 'react';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#29bfc7',
        padding: '10px',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FaRobot style={{ fontSize: '2.5em' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2em', margin: '0'}}>¡Z-R0 web!</h1>
        <p style={{ fontSize: '1em', margin: '0',fontFamily:'grecia'  }}>Controla tu robot y explora el tablero.</p>
      </div>
      <FaRobot style={{ fontSize: '2.5em' }} />
    </header>
  );
};

export default Header;
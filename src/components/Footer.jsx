import React from 'react';

const Footer = () => {
    return (
      <footer 
        style={{
          backgroundColor: '#29bfc7',
          padding: '20px',
          width: '100%',
          position: 'fixed',
          bottom: '0%',
          left: '0',
          display: 'flex',
          fontFamily: 'cursive',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/unahur.png" 
            alt="Unahur"
            style={{ marginRight: '10px', width: '20px', height: 'auto' }}
          />
          <div>
            <p style={{ fontSize: '1em', margin: '0'}}>Universidad Nacional de Hurlingham</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
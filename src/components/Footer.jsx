import React from 'react';

const Footer = () => {
    return (
      <footer 
        style={{
          backgroundColor: 'rgba(41, 191, 199, 0.7)',
          padding: '0.5px',
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
            style={{  marginRight: '5px', width: '50px', height: 'auto' }}
          />
          <div>
            <p style={{ fontSize: '1.3em', margin: '0',color: 'black'}}>Universidad Nacional de Hurlingham</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
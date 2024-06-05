import React from 'react';

const Footer = () => {
    return (
      <footer 
        style={{
          backgroundColor: '#D9D9D9',
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
            style={{ marginRight: '30px', width: '30px', height: 'auto' }}
          />
          <div>
            <p style={{ fontSize: '1.5em', margin: '0',color: 'black'}}>Universidad Nacional de Hurlingham</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
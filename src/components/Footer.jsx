import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgba(41, 191, 199, 0.7)',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <img src="/images/unahur.png" alt="Unahur" style={{ marginRight: '5px', width: '50px' }} />
        <div>
          <p style={{ fontSize: '1.2em', textAlign: 'center', color: 'black', fontFamily: 'Arial, sans-serif' }}>Universidad Nacional de Hurlingham</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
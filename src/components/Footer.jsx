import React from 'react';
import foto from './unahur.png';

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
            src={foto} 
            alt=""
            style={{ marginRight: '10px', width: '20px', height: 'auto' }} //ARREGLAR CUANDO SE ACHICA 
                                                                          //PANTALLA SE JUNTA CON TABLERO
          />
          <div>
            <p style={{ fontSize: '1em', margin: '0'}}>Universidad Nacional de Hurlingham</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

const ModalTablero = ({ isOpen, onClose, onSelectTablero }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1050
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '300px',
        animation: 'scale-up 0.3s ease-in-out',
        position: 'relative'
      }}>
        <h2>Seleccione un tablero:</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10px' }}>
          {[1, 2, 3].map((tableroId) => (
            <button
              key={tableroId}
              onClick={() => onSelectTablero(tableroId)}
              style={{
                padding: '10px 20px',
                marginBottom: '20px',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                width: '75%',
                backgroundColor: tableroId === 1 ? '#8e44ad' : tableroId === 2 ? '#2196f3' : '#ffc107',
                textAlign: 'center'
              }}
            >
              Tablero {tableroId}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <AiOutlineClose style={{ color: 'red', fontSize: '1.5em' }} />
        </button>
      </div>
    </div>
  );
};

ModalTablero.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectTablero: PropTypes.func.isRequired
};

export default ModalTablero;
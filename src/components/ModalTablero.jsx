import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ModalTablero = ({ isOpen, onClose, onSelectTablero }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
          <div className="modal-content">
              <h2>Seleccione un tablero:</h2>
              <div className="buttons-container">
                  {[1, 2, 3].map((tableroId) => (
                      <button
                          key={tableroId}
                          onClick={() => onSelectTablero(tableroId)}
                          className={`modal-button tablero-${tableroId}`}
                      >
                          Tablero {tableroId}
                      </button>
                  ))}
              </div>
              <button onClick={onClose} className="modal-button close-button">Cerrar</button>
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

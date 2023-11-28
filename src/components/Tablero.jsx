import React from 'react';
import PropTypes from 'prop-types'

const Tablero = ( {gridSize, posicionRobot }) => {
  const obtenerFlecha = () => {
    const estiloFlecha = {
      fontSize: '40px',
    };
    
    switch (posicionRobot.orientacion) {
      case 'derecha':
        return <span style={estiloFlecha}>&rarr;</span>;
      case 'izquierda':
        return <span style={estiloFlecha}>&larr;</span>;
      case 'arriba':
        return <span style={estiloFlecha}>&uarr;</span>;
      case 'abajo':
        return <span style={estiloFlecha}>&darr;</span>;
    }
  };

  

  return (
      <table style={{ marginBottom: '25px', borderSpacing:0, border:'1px solid black', width:'100%' }} >
        <tbody>
          {[...Array(gridSize)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(gridSize)].map((_, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', width: '100px', height: '100px' }}>
                  {posicionRobot.row === rowIndex && posicionRobot.col === colIndex &&
                    obtenerFlecha()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  );
};

Tablero.propTypes = {
  gridSize: PropTypes.number.isRequired,
  posicionRobot: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    orientacion: PropTypes.oneOf(['derecha', 'izquierda', 'arriba', 'abajo']).isRequired,
  }).isRequired,
};

export default Tablero;

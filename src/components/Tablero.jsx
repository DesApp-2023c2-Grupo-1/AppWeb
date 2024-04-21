import React from 'react';
import PropTypes from 'prop-types';

const Tablero = ({ gridSize, posicionRobot }) => {
  const obtenerFlecha = () => {
    const estiloFlecha = {
      fontSize: '50px',
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
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', background: '#29bfc7' }}>
        <table style={{ borderSpacing: 0 }}>
          <tbody>
            {[...Array(gridSize)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(gridSize)].map((_, colIndex) => (
                  <td key={colIndex} style={{ border: '1px solid black', width: '80px', height: '80px', textAlign: 'center' }}>
                    {posicionRobot.row === rowIndex && posicionRobot.col === colIndex && obtenerFlecha()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

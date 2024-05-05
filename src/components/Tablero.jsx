import React from 'react';
import PropTypes from 'prop-types';

const Tablero = ({ gridSize, posicionRobot }) => {
  const obtenerFlecha = () => {
    const estiloFlecha = {
      fontSize: '40px',
    };

    switch (posicionRobot.orientacion) {
      case 'derecha':
        return <span style={estiloFlecha}>🤖</span>;
      case 'izquierda':
        return <span style={estiloFlecha}>🤖</span>;
      case 'arriba':
        return <span style={estiloFlecha}>🤖</span>;
      case 'abajo':
        return <span style={estiloFlecha}>🤖</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', background: 'white' }}>
        <table style={{ borderSpacing: 0 }}>
          <tbody>
            {[...Array(gridSize)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(gridSize)].map((_, colIndex) => (
                  <td key={colIndex} style={{ border: '3px solid black', width: '80px', height: '80px', textAlign: 'center' }}>
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

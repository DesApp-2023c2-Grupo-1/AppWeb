import React, { useState } from 'react';

function App() {
  const gridSize = 5;
  const posicionRobotInicial = { row: 0, col: 0, orientacion: 'derecha' };

  const [posicionRobot, setPosicionRobot] = useState(posicionRobotInicial);

  const moverRobot = (direction) => {
    const nuevaPosicion = { ...posicionRobot };

    switch (direction) {
      case 'avanzar':
        moverEnDireccion(nuevaPosicion, true);
        break;
      case 'retroceder':
        moverEnDireccion(nuevaPosicion, false);
        break;
      case 'derecha':
        console.log(nuevaPosicion)
        cambiarOrientacion(nuevaPosicion, 'derecha');
        break;
      case 'izquierda':
        cambiarOrientacion(nuevaPosicion, 'izquierda');
        break;
      default:
        // Comando no reconocido
        return;
    }

    setPosicionRobot(nuevaPosicion);
  };

  const moverEnDireccion = (posicion, avanza) => {
    const direccion = posicion.orientacion;
    
    const cambios = {
      'abajo': { row: avanza ? 1 : -1, col: 0 },
      'derecha': { row: 0, col: avanza ? 1 : -1 },
      'izquierda': { row: 0, col: avanza ? -1 : 1 },
      'arriba': { row: avanza ? -1 : 1, col: 0 },
    };
  
    posicion.row = (posicion.row + cambios[direccion].row + gridSize) % gridSize;
    posicion.col = (posicion.col + cambios[direccion].col + gridSize) % gridSize;
  };

  const cambiarOrientacion = (posicion, nuevaOrientacion) => {
    const transicionesOrientacion = {
      'derecha': { 'derecha': 'abajo', 'izquierda': 'arriba' },
      'abajo': { 'derecha': 'izquierda', 'izquierda': 'derecha' },
      'izquierda': { 'derecha': 'arriba', 'izquierda': 'abajo' },
      'arriba': { 'derecha': 'derecha', 'izquierda': 'izquierda' },
    };
  
    posicion.orientacion = transicionesOrientacion[posicion.orientacion][nuevaOrientacion];
  };

  const obtenerFlecha = () => {
    switch (posicionRobot.orientacion) {
      case 'derecha':
        return <span>&rarr;</span>;
      case 'izquierda':
        return <span>&larr;</span>;
      case 'arriba':
        return <span>&uarr;</span>;
      case 'abajo':
        return <span>&darr;</span>;
    }
  };

  const handleConsoleCommand = () => {
    const command = window.prompt('Introduce un comando:');
    if (command !== null) {
      switch (command.toUpperCase()) {
        case 'F':
          moverRobot('avanzar');
          break;
        case 'B':
          moverRobot('retroceder');
          break;
        case 'R':
          moverRobot('derecha');
          break;
        case 'L':
          moverRobot('izquierda');
          break;
        default:
          alert('Comando no reconocido');
          break;
      }
    }
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {[...Array(gridSize)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(gridSize)].map((_, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', width: '30px', height: '30px' }}>
                  {posicionRobot.row === rowIndex && posicionRobot.col === colIndex &&
                    obtenerFlecha()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleConsoleCommand}>Introducir Comando</button>
    </div>
  );
}

export default App;

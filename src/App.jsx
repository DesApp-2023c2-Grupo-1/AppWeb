import React, { useState } from 'react';

function App() {
  const gridSize = 5;
  const posicionRobotInicial = { row: 0, col: 0 };

  const [posicionRobot, setPosicionRobot] = useState(posicionRobotInicial);

  const moverRobot = (direction) => {
    const nuevaPosicion = { ...posicionRobot };

    // eslint-disable-next-line default-case
    switch (direction) {
      case 'avanzar':
        nuevaPosicion.col = (nuevaPosicion.col + 1) % gridSize;
        break;
      case 'retroceder':
        nuevaPosicion.col = (nuevaPosicion.col - 1) % gridSize;
        break;
      case 'derecha':
        nuevaPosicion.col = (nuevaPosicion.col + 1) % gridSize;
        break;
      case 'izquierda':
        nuevaPosicion.col = (nuevaPosicion.col - 1) % gridSize;
        break;
    }

    setPosicionRobot(nuevaPosicion);
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
                  {posicionRobot.row === rowIndex && posicionRobot.col === colIndex && (
                    <span role="img" aria-label="robot">
                      🤖
                    </span>
                  )}
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
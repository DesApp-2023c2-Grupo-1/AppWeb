import React, { useEffect, useState } from 'react';
import Api from './api.js';

function App() {
  const gridSize = 5;
  const posicionRobotInicial = { row: 0, col: 0, orientacion: 'derecha' };

  const [posicionRobot, setPosicionRobot] = useState(posicionRobotInicial);

  const moverRobot = (direction) => {
    setPosicionRobot((prevPosicion) => {
      const nuevaPosicion = { ...prevPosicion };

      switch (direction) {
        case 'avanzar':
          moverEnDireccion(nuevaPosicion, true);
          break;
        case 'retroceder':
          moverEnDireccion(nuevaPosicion, false);
          break;
        case 'derecha':
          cambiarOrientacion(nuevaPosicion, 'derecha');
          break;
        case 'izquierda':
          cambiarOrientacion(nuevaPosicion, 'izquierda');
          break;
        default:
          // Comando no reconocido
          return prevPosicion;
      }

      return nuevaPosicion;
    });
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


  const handleConsoleCommand = async () => {

    const a = await Api.obtenerRegistros()
    const comandos = a.data.data[0].comandos

    for (let i = 0; i < comandos.length; i++) {
      console.log(comandos[i])
      if (comandos[i] !== null) {
        switch (comandos[i].toUpperCase()) {
          case 'F':
            await delay(1000); 
            await moverRobotAsync('avanzar');
            break;
          case 'R':
            await delay(1000);
            await moverRobotAsync('derecha');
            break;
          case 'L':
            await delay(1000);
            await moverRobotAsync('izquierda');
            break;
          case 'B':
            await delay(1000);
            await moverRobotAsync('retroceder');
            break;
          default:
            alert('Comando no reconocido');
            break;
        }
      }
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const moverRobotAsync = async (direction) => {
    return new Promise((resolve) => {
      moverRobot(direction);
      setTimeout(() => resolve(), 0);
    });
  };

  useEffect(() => {}, [posicionRobot]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '600px', margin: 'auto', height: '100vh' }}>
      <table style={{ marginBottom: '25px' }} >
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
      <button onClick={handleConsoleCommand} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>Introducir Comando</button>
    </div>
  );
}

export default App;

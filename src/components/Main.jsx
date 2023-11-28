import React, { useEffect, useState } from 'react';
import Tablero from './Tablero';
import Api from '../api';

const Robot = () => {
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

  const handleConsoleCommand = async () => {

    const a = await Api.obtenerRegistros()
    const comandos = a.data.data[0].comandos

    for (let i = 0; i < comandos.length; i++) {
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
    <div>
      <Tablero gridSize={gridSize} posicionRobot={posicionRobot} />
      <button onClick={handleConsoleCommand} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      } }>
        Ejecutar Comando
      </button>
    </div>
  );
};

export default Robot;

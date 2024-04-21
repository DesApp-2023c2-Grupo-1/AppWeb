import React, { useEffect, useState } from 'react';
import Tablero from './Tablero';
import Api from '../api';
import Header from './Header';

const Robot = () => {
  const gridSize = 5;
  const posicionRobotInicial = { row: 0, col: 0, orientacion: 'derecha' };
  const [posicionRobot, setPosicionRobot] = useState(posicionRobotInicial);
  const [comandos, setComandos] = useState([]);

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

  const obtenerRegistrosSiempre = async () => {
    const registro = await Api.obtenerRegistros();
    const nuevosComandos = registro.comandos || [];

    setComandos(nuevosComandos);
  };

  const ejecutarComandos = async () => {
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

    setComandos([]);
    await delay(1000);
    setPosicionRobot(posicionRobotInicial);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const moverRobotAsync = async (direction) => {
    return new Promise((resolve) => {
      moverRobot(direction);
      setTimeout(() => resolve(), 0);
    });
  };

  useEffect(() => {
    obtenerRegistrosSiempre();
  }, [comandos]);

  useEffect(() => {
    if (comandos.length > 0) {
      ejecutarComandos();
    }
  }, [comandos]);

  return (
    <div style={{ margin: '0', padding: '0' }}>
      <Header/>
      <div >
        <Tablero gridSize={gridSize} posicionRobot={posicionRobot} />
      </div>
    </div>
  );
};

export default Robot;

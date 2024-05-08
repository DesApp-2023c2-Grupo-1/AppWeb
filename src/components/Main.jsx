import React, { useEffect, useState } from 'react';
import Tablero from './Tablero';
import Api from '../api';
import Header from './Header';
import Footer from './Footer';
import ModalTablero from './ModalTablero';
import './styles.css';

const tablerosConfig = [
  { id: 1, gridSize: 6, posicionRobotInicial: { row: 0, col: 0, orientacion: 'derecha' } },
  { id: 2, gridSize: 6, posicionRobotInicial: { row: 2, col: 3, orientacion: 'abajo' } },
  { id: 3, gridSize: 6, posicionRobotInicial: { row: 3, col: 5, orientacion: 'izquierda' } }
];

const Robot = () => {
  const [tableroActual, setTableroActual] = useState(tablerosConfig[0]);
  const [posicionRobot, setPosicionRobot] = useState(tableroActual.posicionRobotInicial);
  const [comandos, setComandos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPosicionRobot(tableroActual.posicionRobotInicial);
  }, [tableroActual]);

  const handleSelectTablero = (id) => {
    const nuevoTablero = tablerosConfig.find(t => t.id === id);
    setTableroActual(nuevoTablero);
    setIsModalOpen(false); 
  };

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
          return prevPosicion;
      }

      return nuevaPosicion;
    });
  };

  const moverEnDireccion = (posicion, avanza) => {
    const direccion = posicion.orientacion;
    const gridSize = tableroActual.gridSize;
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

  useEffect(() => {
    const obtenerRegistrosSiempre = async () => {
      const registro = await Api.obtenerRegistros();
      const nuevosComandos = registro.comandos || [];
      setComandos(nuevosComandos);
    };

    obtenerRegistrosSiempre();
  }, [comandos]);

  useEffect(() => {
    const ejecutarComandos = async () => {
      for (let comando of comandos) {
        if (comando !== null) {
          switch (comando.toUpperCase()) {
            case 'F':
              await delay(1000);
              moverRobot('avanzar');
              break;
            case 'R':
              await delay(1000);
              moverRobot('derecha');
              break;
            case 'L':
              await delay(1000);
              moverRobot('izquierda');
              break;
            case 'B':
              await delay(1000);
              moverRobot('retroceder');
              break;
            default:
              alert('Comando no reconocido');
              break;
          }
        }
      }
      setComandos([]);
      await delay(1000);
      setPosicionRobot(tableroActual.posicionRobotInicial);
    };

    if (comandos.length > 0) {
      ejecutarComandos();
    }
  }, [comandos]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div style={{ margin: '0', padding: '0' }}>
  <Header />
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '60px' }}>
    <Tablero gridSize={tableroActual.gridSize} posicionRobot={posicionRobot} />
    <div style={{ marginTop: '25px' }}>
      <button className="button-cambiar-tablero" onClick={() => setIsModalOpen(true)}>Cambiar Tablero</button>
    </div>
    <ModalTablero isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectTablero={handleSelectTablero} />
  </div>
  <Footer />
</div>
    
     
    
  );
};

export default Robot;

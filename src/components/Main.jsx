import React, { useState, useEffect } from 'react';
import Tablero from './Tablero';
import Header from './Header';
import Footer from './Footer';
import ModalTablero from './ModalTablero';
import DraggableItem from './DraggableItem';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Api from '../api';

const tablerosConfig = [
  { id: 1, gridSize: 6, posicionRobotInicial: { row: 0, col: 0, orientacion: 'derecha' } },
  { id: 2, gridSize: 6, posicionRobotInicial: { row: 2, col: 3, orientacion: 'abajo' } },
  { id: 3, gridSize: 6, posicionRobotInicial: { row: 3, col: 5, orientacion: 'izquierda' } }
];

const Main = () => {
  const [tableroActual, setTableroActual] = useState(tablerosConfig[0]);
  const [posicionRobot, setPosicionRobot] = useState(tableroActual.posicionRobotInicial);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedCells, setDraggedCells] = useState([]);
  const [comandos, setComandos] = useState([]);

  useEffect(() => {
    setPosicionRobot(tableroActual.posicionRobotInicial);
  }, [tableroActual]);

  const handleSelectTablero = (id) => {
    const nuevoTablero = tablerosConfig.find(t => t.id === id);
    setTableroActual(nuevoTablero);
    setItems([]);
    setIsModalOpen(false);
    setDraggedCells([]);
  };

  const handleDropItem = (type, image, row, col, itemId) => {
    setItems((prevItems) => {
      const filteredItems = prevItems.filter(item => item.id !== itemId);
      return [...filteredItems, { type, image, row, col, id: itemId }];
    });
  };

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    setDraggedCells([]);
  };

  const handleTrashDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    handleRemoveItem(itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClearAllItems = () => {
    setItems([]);
    setDraggedCells([]);
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
          // Comando no reconocido
          return prevPosicion;
      }

      return nuevaPosicion;
    });
  };

  const moverEnDireccion = (posicion, avanza) => {
    const direccion = posicion.orientacion;
    const gridSize = tableroActual.gridSize
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
    setPosicionRobot(posicionRobot);
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
    <div style={{ margin: '0', padding: '0', backgroundColor:"#D9D9D9" }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '50px' }}>
          <DraggableItem item="circo" image="/images/circo-mod.png" />
          <DraggableItem item="escuela" image="/images/escuela-mod.png" />
          <DraggableItem item="casa" image="/images/casa-mod.png" />
          <DraggableItem item="plaza" image="/images/plaza-mod.png" />
          <DraggableItem item="supermercado" image="/images/super-mod.png" />
          <DraggableItem item="heladería" image="/images/heladeria-mod.png" />
        </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
    <Tablero
        gridSize={tableroActual.gridSize}
        posicionRobot={posicionRobot}
        items={items}
        onDropItem={handleDropItem}
        draggedCells={draggedCells}
        setDraggedCells={setDraggedCells}
      />
      <div style={{ marginTop: '20px' }}>
        <button className="button-cambiar-tablero" onClick={() => setIsModalOpen(true)}>Cambiar Tablero</button>
      </div>
      <ModalTablero 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectTablero={handleSelectTablero} 
      />
    </div>
  </div>
  <div 
    onDrop={handleTrashDrop}  
    onDragOver={handleDragOver}
    style={{ position: 'fixed', bottom: '20px', right: '20px', width: '100px', height: '100px', cursor: 'pointer' }}
  >
    <FontAwesomeIcon onClick={handleClearAllItems}  icon={faTrashCan} style={{ color: 'red', width: '40%', height: '40%' }} />
  </div>
  <Footer />
</div>
);
};

export default Main;
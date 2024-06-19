import React, { useState, useEffect, useRef } from 'react';
import Tablero from './Tablero';
import Header from './Header';
import Footer from './Footer';
import ModalTablero from './ModalTablero';
import DraggableItem from './DraggableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Importamos el archivo de estilos CSS
import Api from '../api';

const tablerosConfig = [
  { id: 1, gridSize: 6, posicionRobotInicial: { row: 0, col: 0, orientacion: 'derecha' } },
  { id: 2, gridSize: 6, posicionRobotInicial: { row: 2, col: 3, orientacion: 'abajo' } },
  { id: 3, gridSize: 6, posicionRobotInicial: { row: 3, col: 5, orientacion: 'izquierda' } }
];

const Main = () => {
  const [tableroActual, setTableroActual] = useState(tablerosConfig[0]);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedCells, setDraggedCells] = useState([]);
  const [comandos, setComandos] = useState([]);
  const posicionRobotRef = useRef(tableroActual.posicionRobotInicial);
  const [posicionRobot, setPosicionRobot] = useState(posicionRobotRef.current);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setPosicionRobot(tableroActual.posicionRobotInicial);
    posicionRobotRef.current = tableroActual.posicionRobotInicial;
  }, [tableroActual]);

  const handleSelectTablero = (id) => {
    const nuevoTablero = tablerosConfig.find(t => t.id === id);
    setTableroActual(nuevoTablero);
    setItems([]);
    setIsModalOpen(false);
    setDraggedCells([]);
    setPosicionRobot(nuevoTablero.posicionRobotInicial);
    posicionRobotRef.current = nuevoTablero.posicionRobotInicial;
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

      posicionRobotRef.current = nuevaPosicion;
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

    const nuevaFila = (posicion.row + cambios[direccion].row);
    const nuevaColumna = (posicion.col + cambios[direccion].col);

    // Verificar si la nueva posición está dentro de los límites del tablero
    if (nuevaFila >= 0 && nuevaFila < gridSize && nuevaColumna >= 0 && nuevaColumna < gridSize) {
      // Actualizar la posición del robot
      posicion.row = nuevaFila;
      posicion.col = nuevaColumna;
    }
    const itemEnPosicion = items.find(item => item.row === nuevaFila && item.col === nuevaColumna);
    if (itemEnPosicion) {
      setMensaje(`Estoy en ${itemEnPosicion.type}!!`);
      setTimeout(() => {
        setMensaje(null);
      }, 2000);
    }
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
    try {
      const registro = await Api.obtenerRegistros();
      const nuevosComandos = registro.comandos || [];

      console.log('Comandos recibidos:', nuevosComandos);

      if (nuevosComandos.length > 0) {
        setComandos(nuevosComandos);
        console.log('Comandos state:', comandos);
      }
    } catch (error) {
      console.error('Error al obtener comandos:', error);
    }
  };

  const ejecutarComandos = async () => {
    for (let i = 0; i < comandos.length; i++) {
      if (comandos[i] !== null) {
        switch (comandos[i].toUpperCase()) {
          case 'F':
            console.log('Ejecutando comando: Avanzar');
            await moverRobotAsync('avanzar');
            break;
          case 'R':
            console.log('Ejecutando comando: Derecha');
            await moverRobotAsync('derecha');
            break;
          case 'L':
            console.log('Ejecutando comando: Izquierda');
            await moverRobotAsync('izquierda');
            break;
          case 'B':
            console.log('Ejecutando comando: Retroceder');
            await moverRobotAsync('retroceder');
            break;
          default:
            console.error('Comando no reconocido:', comandos[i]);
            break;
        }
      }
    }

    setComandos([]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const moverRobotAsync = async (direction) => {
    return new Promise((resolve) => {
      moverRobot(direction);
      delay(1000).then(() => resolve());
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
    <div id="root" >
      <Header />
      <div className="main-content">
        <div className="draggable-items">
          <DraggableItem item="circo" image="/images/circo-mod.png" />
          <DraggableItem item="escuela" image="/images/escuela-mod.png" />
          <DraggableItem item="casa" image="/images/casa-mod.png" />
          <DraggableItem item="plaza" image="/images/plaza-mod.png" />
          <DraggableItem item="supermercado" image="/images/super-mod.png" />
          <DraggableItem item="heladería" image="/images/heladeria-mod.png" />
        </div>
        <div className="tablero-container">
          <Tablero
            gridSize={tableroActual.gridSize}
            posicionRobot={posicionRobot}
            items={items}
            onDropItem={handleDropItem}
            draggedCells={draggedCells}
            setDraggedCells={setDraggedCells}
          />
          {mensaje && (
            <div className="dialogo">
              {mensaje}
            </div>
          )}
          <button className="button-cambiar-tablero" onClick={() => setIsModalOpen(true)}>Cambiar Tablero</button>
          <ModalTablero
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectTablero={handleSelectTablero}
          />

        </div>
        <div className="trash-can" onDrop={handleTrashDrop} onDragOver={handleDragOver}>
            <FontAwesomeIcon onClick={handleClearAllItems} icon={faTrashCan} className="trash-icon" />
        </div>  
      </div>
      
      <Footer />
    </div>
  );
};

export default Main;
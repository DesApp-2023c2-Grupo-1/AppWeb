import React, { useState } from 'react';
import Tablero from './Tablero';
import Header from './Header';
import Footer from './Footer';
import ModalTablero from './ModalTablero';
import DraggableItem from './DraggableItem';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

  const handleSelectTablero = (id) => {
    const nuevoTablero = tablerosConfig.find(t => t.id === id);
    setTableroActual(nuevoTablero);
    setPosicionRobot(nuevoTablero.posicionRobotInicial);
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

  return (
    <div style={{ margin: '0', padding: '0' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '50px' }}>
          <DraggableItem item="circo" image="/images/circo.jpeg" />
          <DraggableItem item="escuela" image="/images/escuela.jpeg" />
          <DraggableItem item="casa" image="/images/casa.jpeg" />
          <DraggableItem item="plaza" image="/images/plaza.jpeg" />
          <DraggableItem item="supermercado" image="/images/super.jpeg" />
          <DraggableItem item="heladería" image="/images/heladeria.jpeg" />
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
          <ModalTablero isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectTablero={handleSelectTablero} />
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
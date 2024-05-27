import React, { useState } from 'react';
import Tablero from './Tablero';
import Header from './Header';
import Footer from './Footer';
import ModalTablero from './ModalTablero';
import DraggableItem from './DraggableItem';
import './styles.css';

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

  const handleSelectTablero = (id) => {
    const nuevoTablero = tablerosConfig.find(t => t.id === id);
    setTableroActual(nuevoTablero);
    setPosicionRobot(nuevoTablero.posicionRobotInicial);
    setItems([]);
    setIsModalOpen(false);
  };

  const handleDropItem = (type, image, row, col, itemId) => {
    setItems((prevItems) => {
      const filteredItems = prevItems.filter(item => item.id !== itemId);
      return [...filteredItems, { type, image, row, col, id: itemId }];
    });
  };

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const handleTrashDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    handleRemoveItem(itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ margin: '0', padding: '0' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '60px' }}>
        <div style={{ marginRight: '20px' }}>
          <DraggableItem item="escuela" image="/images/escuela.jpg" />
          <DraggableItem item="calle_cortada" image="/images/calle_cortada.jpg" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tablero
            gridSize={tableroActual.gridSize}
            posicionRobot={posicionRobot}
            items={items}
            onDropItem={handleDropItem}
          />
          <div style={{ marginTop: '25px' }}>
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
        <img src="/images/tacho_basura.jpg" alt="Tacho de basura" style={{ width: '50%', height: '50%' }} />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Tablero = ({ gridSize, posicionRobot, items, onDropItem }) => {
  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData('itemType');
    const itemImage = e.dataTransfer.getData('itemImage');

    onDropItem(itemType, itemImage, row, col);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderCell = (row, col) => {
    const item = items.find((item) => item.row === row && item.col === col);
    const isRobotHere = posicionRobot.row === row && posicionRobot.col === col;

    let cellContent = null;
    if (isRobotHere) {     
        cellContent = '🤖';
    } else if (item) {
      cellContent = (
        <img
          src={item.image}
          alt={item.type}
          style={{ width: '100%', height: '100%' }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('itemType', item.type);
            e.dataTransfer.setData('itemImage', item.image);
          }}
        />
      );
    }

    return (
      <div
        key={`${row}-${col}`}
        onDrop={(e) => handleDrop(e, row, col)}
        onDragOver={handleDragOver}
        className="cell"
        style={{
          width: '85px',
          height: '85px',
          border: '2px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cellContent}
      </div>
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      const cols = [];
      for (let col = 0; col < gridSize; col++) {
        cols.push(renderCell(row, col));
      }
      grid.push(
        <div key={row} className="row" style={{ display: 'flex' }}>
          {cols}
        </div>
      );
    }
    return grid;
  };

  return <div className="tablero" style={{ display: 'inline-block' }}>{renderGrid()}</div>;
};

Tablero.propTypes = {
  gridSize: PropTypes.number.isRequired,
  posicionRobot: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    orientacion: PropTypes.oneOf(['derecha', 'izquierda', 'arriba', 'abajo']).isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDropItem: PropTypes.func.isRequired,
};

export default Tablero;

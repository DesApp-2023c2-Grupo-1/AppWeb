import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Tablero = ({ gridSize, posicionRobot, items, onDropItem, draggedCells, setDraggedCells }) => {
  const handleDrop = (e, row, col) => {
    e.preventDefault();

    if (items.some(item => item.row === row && item.col === col) ||
        (posicionRobot.row === row && posicionRobot.col === col)) {
      return;
    }

    const itemType = e.dataTransfer.getData('itemType');
    const itemImage = e.dataTransfer.getData('itemImage');
    const itemId = e.dataTransfer.getData('itemId');

    onDropItem(itemType, itemImage, row, col, itemId);
    setDraggedCells([]);
  };

  const handleDragOver = (e, row, col) => {
    e.preventDefault();

    if (items.some(item => item.row === row && item.col === col) ||
        (posicionRobot.row === row && posicionRobot.col === col)) {
      return;
    }

    if (!draggedCells.includes(`${row}-${col}`)) {
      setDraggedCells([...draggedCells, `${row}-${col}`]);
    }
  };

  const robot = (orientacion) => {
    let rotation = '';
    switch (orientacion) {
      case 'derecha':
        rotation = 'rotate(-90deg)';
        break;
      case 'izquierda':
        rotation = 'rotate(90deg)';
        break;
      case 'arriba':
        rotation = 'rotate(180deg)';
        break;
      case 'abajo':
        rotation = 'rotate(0deg)';
        break;
      default:
        break;
    }
  
    return (
      <img
        src="/images/Z-R0.jpg"
        alt="Robot"
        style={{ width: '100%', height: '100%', transform: rotation }}
        draggable={false}
      />
    );
  };  

  const renderCell = (row, col) => {
    const item = items.find((item) => item.row === row && item.col === col);
    const isRobotHere = posicionRobot.row === row && posicionRobot.col === col;

    let cellContent = null;
    if (isRobotHere) {
      cellContent = robot(posicionRobot.orientacion);
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
            e.dataTransfer.setData('itemId', item.id);
          }}
          onDragEnd={() => setDraggedCells([])}
        />
      );
    }

    const isDragged = draggedCells.includes(`${row}-${col}`);

    return (
      <div
        key={`${row}-${col}`}
        onDrop={(e) => handleDrop(e, row, col)}
        onDragOver={(e) => handleDragOver(e, row, col)}
        className="cell"
        style={{
          width: '90px',
          height: '90px',
          border: '2px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDragged ? '#2196f3' : '',
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

  return <div className="tablero">{renderGrid()}</div>;
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
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDropItem: PropTypes.func.isRequired,
  draggedCells: PropTypes.array.isRequired,
  setDraggedCells: PropTypes.func.isRequired,
};

export default Tablero;
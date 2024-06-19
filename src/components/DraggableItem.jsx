import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const DraggableItem = ({ item, image }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', item);
    e.dataTransfer.setData('itemImage', image);
    e.dataTransfer.setData('itemId', `${item}_${Date.now()}`); // Generar un ID único
  };

  return (
    <div className="draggable-item" draggable onDragStart={handleDragStart}>
      <img src={image} alt={item} />
      <p>{item}</p>
    </div>
  );
};

DraggableItem.propTypes = {
  item: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DraggableItem;
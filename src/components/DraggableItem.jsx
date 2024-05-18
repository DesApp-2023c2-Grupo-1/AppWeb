// DraggableItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DraggableItem = ({ item, image }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', item);
    e.dataTransfer.setData('itemImage', image);
  };

  return (
    <div draggable onDragStart={handleDragStart} style={{ marginBottom: '10px' }}>
      <img src={image} alt={item} style={{ width: '50px', height: '50px' }} />
    </div>
  );
};

DraggableItem.propTypes = {
  item: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DraggableItem;


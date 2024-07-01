import React from 'react';
import PropTypes from 'prop-types';

const DraggableItem = ({ item, image }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', item);
    e.dataTransfer.setData('itemImage', image);
    e.dataTransfer.setData('itemId', `${item}_${Date.now()}`); // Generar un ID único
  };

  return (
    <div className='draggable-item'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '30px'
      }}
      draggable
      onDragStart={handleDragStart}
    >
      <img src={image} alt={item}  />
      <p style={{ 
        display: 'flex',
        alignItems: 'center',
        margin: '0', 
        fontWeight: 'bold', 
        marginTop: '15px', 
        color: '#333', 
        textTransform: 'capitalize', 
        fontSize: '16px', 
        fontFamily: 'Arial, sans-serif' 
        }}>
          {item}
      </p>
    </div>
  );
};

DraggableItem.propTypes = {
  item: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DraggableItem;
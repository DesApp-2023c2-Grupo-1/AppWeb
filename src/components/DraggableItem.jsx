import React from 'react';
import PropTypes from 'prop-types';

const DraggableItem = ({ item, image }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', item);
    e.dataTransfer.setData('itemImage', image);
    e.dataTransfer.setData('itemId', `${item}_${Date.now()}`); // Generar un ID único
  };

  return (
    <div draggable onDragStart={handleDragStart} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px', textAlign: 'center' }}>
      <img src={image} alt={item} style={{ width: '105px', height: '105px', borderRadius: '5px'}} />
      <p 
        style={{
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '15px',
          color: '#333',
          textTransform: 'capitalize',
          fontFamily: 'Arial, sans-serif'
        }}
      >{item}</p>
    </div>
  );
  
};

DraggableItem.propTypes = {
  item: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DraggableItem;
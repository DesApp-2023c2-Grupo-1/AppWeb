import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Api = {
  obtenerRegistros: () => {
    return new Promise((resolve) => {
      socket.on('comandos', (data) => {
        console.log('Socket connected successfully!');
        resolve(data.comando);
      });
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    });
  },
};

export default Api;

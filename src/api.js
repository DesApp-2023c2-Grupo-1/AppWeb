import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Api = {
  obtenerRegistros: () => {
    return new Promise((resolve) => {
      socket.on('comandos', (data) => {
        console.log('Datos del comando:', data.comando);
        resolve(data.comando);
      });
    });
  },
};

export default Api;

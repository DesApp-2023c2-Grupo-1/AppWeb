import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Api = {
  obtenerRegistros: (actualizarDatosCallback) => {
    socket.on('actualizarRegistros', (nuevosRegistros) => {
      actualizarDatosCallback(nuevosRegistros);
    });

    return axios
      .get('http://localhost:3001/comandos/')
      .then(function (response) {
        console.log(response);
        return response;
      });
  },
};

export default Api;

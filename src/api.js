import axios from 'axios';

const Api = {
  obtenerRegistros: () => {
    return axios
      .get('http://localhost:3001/comandos/')
      .then(function (response) {
        console.log(response);
        return response;
      });
  },
};

export default Api;

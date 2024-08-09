import axios from 'axios';
import { API_URL } from '../../../helper';

const apiUrl = `${API_URL}/getPromiseByID`;

const GetPromiseById = (docNo) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "promiseID":docNo ,
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default GetPromiseById;
import axios from 'axios';
import { API_URL } from '../../../helper';

const apiUrl = `${API_URL}/getPromiseRequestbyID`;
 
const GetPromiseRequestById = (docNo) => {
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

export default GetPromiseRequestById;
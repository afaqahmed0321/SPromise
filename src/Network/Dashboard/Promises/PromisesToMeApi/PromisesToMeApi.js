import axios from 'axios';
import { API_URL } from '../../../../../helper';

const apiUrl = `${API_URL}/getPromisesToUser`;

const PromisesToMeApi = (userN) => {
  return new Promise(async(resolve, reject) => {
   await axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
    .then((response) => {
      resolve(response.data.promisesList);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default PromisesToMeApi;

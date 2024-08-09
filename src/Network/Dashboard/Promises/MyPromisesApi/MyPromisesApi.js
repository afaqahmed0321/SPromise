

import axios from 'axios';
import { API_URL } from '../../../../../helper';
const apiUrl = `${API_URL}/getUserPromises`;

const MyPromisesApi = (userN) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
    .then((response) => {
      console.log("All Promises", response)
      resolve(response.data.promisesList);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default MyPromisesApi;

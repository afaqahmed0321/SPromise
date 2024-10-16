import axios from 'axios';
import { API_URL } from '../../../../helper';
const apiUrl = `${API_URL}/getPromiseRequestToUser`;
const GetPromiseRequestToUser = (userN) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
      .then((response) => {
        resolve(response.data.promiseRequestList);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default GetPromiseRequestToUser;
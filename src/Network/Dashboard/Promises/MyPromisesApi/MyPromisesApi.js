

import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getUserPromises';

const MyPromisesApi = (userN) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
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

export default MyPromisesApi;

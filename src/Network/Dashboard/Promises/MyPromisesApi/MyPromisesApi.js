

import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getUserPromises';
// const userNo = "41a7db9b-632b-4fb0-90df-ab81a82f8a71";

const MyPromisesApi = (userN) => {
  // console.log(userN)
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
    .then((response) => {
      resolve(response.data.promisesList);
      // console.log(response.data.promisesList,"aniqa")
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default MyPromisesApi;

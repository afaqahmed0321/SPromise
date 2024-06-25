import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getPromisesToUser';

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

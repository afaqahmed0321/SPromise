import axios from 'axios';
const apiUrl = 'https://snappromise.com:8080/getPromiseRequestToUser';
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
import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getUserPromiseRequest';
// const userNo = "41a7db9b-632b-4fb0-90df-ab81a82f8a71";

const GetUserPromiseRequest = (userN) => {
  // console.log(userN)
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
    .then((response) => {
      resolve(response.data.promiseRequestList);
      console.log(response.data.promiseRequestList)
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default GetUserPromiseRequest;
import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getPromiseRequestbyID';
// const userNo = "41a7db9b-632b-4fb0-90df-ab81a82f8a71";
 
const GetPromiseRequestById = (docNo) => {
  // console.log(userN)
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "promiseID":docNo ,
      },
    })
    .then((response) => {
      // resolve(response.data.promiseRequestList);
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default GetPromiseRequestById;
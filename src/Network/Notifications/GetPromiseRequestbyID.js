import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getPromiseRequestbyID';
 
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
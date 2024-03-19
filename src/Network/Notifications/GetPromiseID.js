import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getPromiseByID';

const GetPromiseById = (docNo) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      params: {
        "promiseID":docNo ,
      },
    })
    .then((response) => {
      console.log(response.data, "Data returned")
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default GetPromiseById;
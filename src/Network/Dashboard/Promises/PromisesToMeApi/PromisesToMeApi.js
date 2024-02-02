import axios from 'axios';

const apiUrl = 'https://snappromise.com:8080/getPromisesToUser';

const PromisesToMeApi = (userN) => {
  console.log(userN,"aniqa")
  return new Promise(async(resolve, reject) => {
   await axios.get(apiUrl, {
      params: {
        "userNo": userN,
      },
    })
    .then((response) => {
      console.log(response.data.promisesList ,"List")
      resolve(response.data.promisesList);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export default PromisesToMeApi;

import Toast from 'react-native-toast-message';
import { API_URL } from '../../../../../helper';

const AcceptPromiseApi = (promiseID, userNo) => {
  const url = `${API_URL}/acceptPromise?promiseID=${promiseID}&userNo=${userNo}`;

  return new Promise((resolve, reject) => {
    console.log("Making request to:", url); // Log URL
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
      },
    })
      .then((response) => {
        console.log("Response status:", response.status); // Log status
        return response.json();
      })
      .then((data) => {
        console.log("Response from service", data);
        if (data.code === 100) {
          Toast.show({
            type: 'success',
            text1: 'Accepted',
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          resolve(data);
        } else {
          console.warn('Unexpected response code:', data);
          reject(new Error('Unexpected response code'));
        }
      })
      .catch((error) => {
        console.error('Error in fetch call:', error.message); // Detailed error message
        reject(error);
      });
  });
};

export default AcceptPromiseApi;

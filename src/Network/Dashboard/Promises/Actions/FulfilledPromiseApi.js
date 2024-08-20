import { ToastAndroid } from 'react-native';
import { API_URL } from '../../../../../helper';

const FulfilledPromiseApi = (promiseID, userNo) => {
  const url = `${API_URL}/fulfilledPromise?promiseID=${promiseID}&userNo=${userNo}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response from service", data);
        if (data.code === 100) {
          ToastAndroid.showWithGravityAndOffset(
            'Fulfilled',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          resolve(data);
        } else {
          console.warn('Unexpected response code:', data);
          reject(new Error('Unexpected response code'));
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        reject(error);
      });
  });
};

export default FulfilledPromiseApi;

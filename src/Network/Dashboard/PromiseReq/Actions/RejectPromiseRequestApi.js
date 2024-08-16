import Toast from 'react-native-toast-message';
import { API_URL } from '../../../../../helper';

const RejectPromiseRequest = (promiseID, userNo) => {
  const url = `${API_URL}/rejectPromiseRequest?promiseID=${promiseID}&userNo=${userNo}`;

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
          Toast.show({
            type: 'success',
            text1: 'Rejected',
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
        console.error('Error:', error.message);
        reject(error);
      });
  });
};

export default RejectPromiseRequest;

import Toast from 'react-native-toast-message';
import { API_URL } from '../../../../../helper';

const AcceptPromiseRequest = async (promiseID, userNo) => {
  const url = `${API_URL}/acceptPromiseRequest?promiseID=${promiseID}&userNo=${userNo}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
      },
      
    });
    const data = await response.json();
    if (data.code === 100) {
      Toast.show({
        type: 'success',
        text1: 'Accepted',
        visibilityTime: 3000, // 3 sec
        position: 'bottom',
      });
    } else {
      console.warn('Unexpected response code:', data.code);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default AcceptPromiseRequest;

import Toast from 'react-native-toast-message';
import { API_URL } from '../../../../../helper';

const CompletePromiseApi = async (promiseID, userNo, note) => {
  const url = `${API_URL}/completePromise?promiseID=${promiseID}&userNo=${userNo}&note=${note}`;

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
        text1: 'Completed',
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return data;
    } else {
      console.warn('Unexpected response code:', data.code);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default CompletePromiseApi;

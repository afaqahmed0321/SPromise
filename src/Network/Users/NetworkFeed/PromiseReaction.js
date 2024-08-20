import { ToastAndroid } from 'react-native';
import { API_URL } from '../../../../helper';

const url = `${API_URL}/promiseReact`;

const PromiseReaction = async (userNN, PIDd, Reac)=> {
  
  const requestBody = {
    "userNo": userNN,
    "promiseID": PIDd,
    "reaction": Reac
  };
  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      },
      body: JSON.stringify (requestBody)
    });

    result = await result.json();
    if (result.code === 100) {
      ToastAndroid.showWithGravityAndOffset(
        Reac+"d",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return result
    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default PromiseReaction;
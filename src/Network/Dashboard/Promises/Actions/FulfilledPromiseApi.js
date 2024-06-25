import { ToastAndroid } from 'react-native';

export default FulfilledPromiseApi = async (promiseID, userNo) => {

    const url = `https://snappromise.com:8080/fulfilledPromise?promiseID=${promiseID}&userNo=${userNo}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
        
      });
      const data = await response.json();
      if (data.code == 100) {
        ToastAndroid.showWithGravityAndOffset(
          'FulFilled',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          500,
          50,
        );
      } else {
        console.warn('Unexpected response code:', data);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
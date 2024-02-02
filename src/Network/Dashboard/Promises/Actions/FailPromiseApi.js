import { ToastAndroid } from 'react-native';
export default FailPromiseApi = async (promiseID, userNo) => {
    const url = `https://snappromise.com:8080/failPromise?promiseID=${promiseID}&userNo=${userNo}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
        
      });
      const data = await response.json();
      console.log('Response:', data);
      if (data.code === 100) {
        ToastAndroid.showWithGravityAndOffset(
          'Makrked Failed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          500,
          50,
        );
      } else {
        // Handle other status codes or errors
        console.warn('Unexpected response code:', result.code);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
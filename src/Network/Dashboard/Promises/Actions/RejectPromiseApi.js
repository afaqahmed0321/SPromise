import { ToastAndroid } from 'react-native';
export default RejectPromiseApi = async (promiseID, userNo) => {
    const url = `https://snappromise.com:8080/rejectPromise?promiseID=${promiseID}&userNo=${userNo}`;
  
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
        ToastAndroid.showWithGravityAndOffset(
          'Rejected',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        console.warn('Unexpected response code:', result.code);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
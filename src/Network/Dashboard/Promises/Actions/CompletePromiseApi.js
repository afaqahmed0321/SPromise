import { ToastAndroid } from 'react-native';
export default CompletePromiseApi = async (promiseID, userNo, note) => {
    const url = `https://snappromise.com:8080/completePromise?promiseID=${promiseID}&userNo=${userNo}&note=${note}`;
  
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
          'Completed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          500,
          50,
        );
      } else {
        console.warn('Unexpected response code:', result.code);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
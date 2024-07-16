import Toast from 'react-native-toast-message';

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
        Toast.show({
          type: 'success',
          text1: 'Fulfilled',
          swipeable: true,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

      } else {
        console.warn('Unexpected response code:', data);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  };
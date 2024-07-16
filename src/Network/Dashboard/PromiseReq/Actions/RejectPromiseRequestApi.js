import Toast from 'react-native-toast-message';
export default RejectPromiseRequest = async (promiseID,userNo) => {
  const url = `https://snappromise.com:8080/rejectPromiseRequest?promiseID=${promiseID}&userNo=${userNo}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'text/plain',
      },
    });
    const data = await response.json();
    if (data.code === 100) {
      Toast.show({
        type: 'success',
        text1: 'Rejected',
        swipeable: true,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

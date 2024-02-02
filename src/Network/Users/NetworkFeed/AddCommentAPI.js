import { ToastAndroid } from 'react-native';

const url = 'https://snappromise.com:8080/addPromiseComment';

const PromiseComment = async (userNN,PID,commen)=> {
  console.log("APi Call ",userNN,PID,commen)
  
  const requestBody = {
    "userNo": userNN,
    "promiseID": PID,
    "comment": commen
  };

  // console.log(requestBody,"requestBodyMakePromiseApi")

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
    console.log(result)
    if (result.code === 100) {
      ToastAndroid.showWithGravityAndOffset(
        'Comment has been added to the Promise',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default PromiseComment;
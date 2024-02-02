import { ToastAndroid } from 'react-native';

const url = 'https://snappromise.com:8080/promiseReact';

const PromiseReaction = async (userNN, PIDd, Reac)=> {
  // console.log("APi Call ",userNN,"User No",PID, "Promise Id")
  
  const requestBody = {
    "userNo": userNN,
    "promiseID": PIDd,
    "reaction": Reac
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
        Reac+"d",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return result
    } else {
      // Handle other status codes or errors
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
    // Handle the error as needed
  }
};

export default PromiseReaction;
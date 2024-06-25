import { ToastAndroid } from 'react-native';

const url = 'https://snappromise.com:8080/addPromiseComment';

const PromiseComment = async (userNN, PID, commen) => {  
  const requestBody = {
    "userNo": userNN,
    "promiseID": PID,
    "comment": commen
  };

  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      },
      body: JSON.stringify(requestBody)
    });

    result = await result.json();
    console.log(result);

    if (result.code === 100) {
      ToastAndroid.showWithGravityAndOffset(
        'Comment has been added to the Promise',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return result; // Return the result if the comment is added successfully
    } else {
      console.warn('Unexpected response code:', result.code);
      return null; // Return null or an empty object if the response code is not as expected
    }
  } catch (error) {
    console.error('Error during API call:', error);
    return null; // Return null in case of an error
  }
};

export default PromiseComment;

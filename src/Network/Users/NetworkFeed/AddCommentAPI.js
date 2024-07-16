import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'success',
        text1: 'Comment has been added ',
        text2: 'to the promise.',
        text1Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        text2Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        swipeable: true,
        text1NumberOfLines: 0,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

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

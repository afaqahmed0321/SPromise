import { ToastAndroid } from 'react-native';

const url = 'https://snappromise.com:8080/saveUsertoNetwork';

const AddUserNetwork = async (AddUserN,userN )=> {
  const requestBody = {
    "userNo": userN,
    "networkUserNo": AddUserN,
    "isFavourite": true
  };

  console.log(requestBody)

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
    console.log(result,"AddTo Network API call")
    if (result.code === 100) {
      ToastAndroid.showWithGravityAndOffset(
        'User has been added to the network',
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

export default AddUserNetwork;
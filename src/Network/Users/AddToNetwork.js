import Toast from 'react-native-toast-message';

const url = 'https://snappromise.com:8080/saveUsertoNetwork';

const AddUserNetwork = async (AddUserN,userN )=> {
  const requestBody = {
    "userNo": userN,
    "networkUserNo": AddUserN,
    "isFavourite": true
  };

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
    if (result.code === 100) {
      Toast.show({
        type: 'success',
        text1: 'User has been added ',
        text2: 'to the network.',
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
        topOffset: -70,
        bottomOffset: 0,
      });

    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default AddUserNetwork;
import Toast from 'react-native-toast-message';

const url = 'https://snappromise.com:8080/promiseReact';

const PromiseReaction = async (userNN, PIDd, Reac) => {
  const requestBody = {
    userNo: userNN,
    promiseID: PIDd,
    reaction: Reac
  };

  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(requestBody)
    });

    result = await result.json();
    if (result.code === 100) {
      Toast.show({
        type: 'success',
        text1: `${Reac}d`, // Displaying the reaction in the toast message
        visibilityTime: 3000, // 3 sec
        position: 'bottom',
      });
      return result;
    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
    Toast.show({
      type: 'error',
      text1: `Error during API call: ${error}`,
      visibilityTime: 3000, // 3 sec
      position: 'bottom',
    });
  }
};

export default PromiseReaction;

import Toast from 'react-native-toast-message';
import { API_URL } from '../../../helper';

const url = `${API_URL}/saveUsertoNetwork`;

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
      
return result.code;
    } else {
      console.warn('Unexpected response code:', result.code);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default AddUserNetwork;
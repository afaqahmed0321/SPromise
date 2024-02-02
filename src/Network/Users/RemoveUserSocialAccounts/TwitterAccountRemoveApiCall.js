import axios from 'axios';
// import { ToastAndroid } from 'react-native';

const AccountRemovedApiCall = async (userN, Platform) => {
  const apiUrl = `https://snappromise.com:8080/api/Users/removeSocialMediaAccount?userNo=${userN}&socialPlatform=${Platform}`;

  console.log('Request Parameters:', userN, Platform);

  try {
    console.log('Try Case');
    const response = await axios.post(apiUrl);
    
    // Uncomment the following line if you want to see the entire response object in the console
    // console.log('API Response:', response);

    console.log('Response Data:', response.data);
    return response.data.code;
  } catch (error) {
    // Uncomment the following line if you want to see the error details in the console
    // console.log('Error:', error);

    // ToastAndroid.showWithGravityAndOffset(
    //   'Already have the user',
    //   ToastAndroid.LONG,
    //   ToastAndroid.BOTTOM,
    //   25,
    //   50,
    // );

    console.error('API Request Error:', error);
    // Return an appropriate value or rethrow the error if needed
    // return [];
  }
};

export default AccountRemovedApiCall;

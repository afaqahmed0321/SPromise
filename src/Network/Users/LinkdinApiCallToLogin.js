import axios from 'axios';
// import { ToastAndroid } from 'react-native';

const LinkDinApiCallLogin = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/linkedInSignIn?userNo='+userN;
  try {
    const response = await axios.get(apiUrl);
    return response.data.url ;
  } catch (error) {   
    console.log(error)
    // return [];
  }
};

export default LinkDinApiCallLogin;
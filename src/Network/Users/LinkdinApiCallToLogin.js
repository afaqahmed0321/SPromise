import axios from 'axios';
// import { ToastAndroid } from 'react-native';

const LinkDinApiCallLogin = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/linkedInSignIn?userNo='+userN;
  // console.log(userN)
  try {
    // console.log("Try Case")
    const response = await axios.get(apiUrl);
    // console.log(response.data.url)
    return response.data.url ;
    // return response.data.code
    

  } catch (error) {
    
   
    console.log(error)
    // return [];
  }
};

export default LinkDinApiCallLogin;
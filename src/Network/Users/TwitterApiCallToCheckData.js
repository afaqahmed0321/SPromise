
import axios from 'axios';
// import { ToastAndroid } from 'react-native';

const TwitterApiCallToCheckData = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/checkTwitter?userNo='+userN;
  console.log(userN)
  try {
    // console.log("Try Case")
    const response = await axios.get(apiUrl);
    // console.log(response.data.description)
    // return response.data.users[0];
    return response.data.code
    

  } catch (error) {
    
    
    console.log(error)
    // return [];
  }
};

export default TwitterApiCallToCheckData;
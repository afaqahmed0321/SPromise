

import axios from 'axios';
import { ToastAndroid } from 'react-native';

const InviteUser = async (email) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/sendJoinInvite?emailID='+email;
  console.log(email)
  try {
    // console.log("Try Case")
    const response = await axios.get(apiUrl);
    console.log(response.data.users[0])
    return response.data.users[0];

  } catch (error) {
    
    
    console.log(error)
    // return [];
  }
};

export default InviteUser;

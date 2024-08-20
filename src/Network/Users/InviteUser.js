

import axios from 'axios';
import { API_URL } from '../../../helper';

const InviteUser = async (email) => {
  const apiUrl = `${API_URL}/api/Users/sendJoinInvite?emailID=`+email;
  try {
    const response = await axios.get(apiUrl);
    return response.data.users[0];
  } catch (error) {
    console.log(error)
  }
};

export default InviteUser;

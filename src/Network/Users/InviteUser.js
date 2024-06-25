

import axios from 'axios';

const InviteUser = async (email) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/sendJoinInvite?emailID='+email;
  try {
    const response = await axios.get(apiUrl);
    return response.data.users[0];
  } catch (error) {
    console.log(error)
  }
};

export default InviteUser;

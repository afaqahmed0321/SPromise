

import axios from 'axios';

const InviteUser = async (email) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/sendJoinInvite?emailID='+email;
  console.log(email)
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data.users[0])
    return response.data.users[0];

  } catch (error) {
    
    
    console.log(error)
  }
};

export default InviteUser;



import axios from 'axios';
import { API_URL } from '../../../helper';

const fetchUser = async (email) => {
  const mail = email.toLowerCase();
  const apiUrl = `${API_URL}/api/Users/getUsers?searchString=`+mail;

  try {
    const response = await axios.get(apiUrl);
    console.log("objecttttttttttt", response.data.users)
    if(response.data.users==null)
    {
      return "User Does not Exist";
    }
    else{
      return response.data.users[0];

    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUser;

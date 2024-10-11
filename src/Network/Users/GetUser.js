

import axios from 'axios';
import { API_URL } from '../../../helper';

const fetchUser = async (email) => {
  const mail = email.toLowerCase()
  console.log("lower mail",mail);
  const apiUrl = `${API_URL}/api/Users/getUsers?searchString=`+mail;

  try {
    const response = await axios.get(apiUrl);
    console.log("get user resp",response.data);
    if(response.data.users==null)
    {
      return "User Does not Exist";
    }
    else{
      console.log("fetch user:",response);
      return response.data.users[0];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUser;

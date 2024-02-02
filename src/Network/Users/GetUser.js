

import axios from 'axios';

const fetchUser = async (email) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/getUsers?searchString='+email;

  try {
    const response = await axios.get(apiUrl);
    // console.log(response.data,"searching user")
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

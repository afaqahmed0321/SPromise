

import axios from 'axios';

const fetchUserData = async (userno) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/getUsersData?userNo='+userno;

  try {
    const response = await axios.get(apiUrl);
    if(response.data==null)
    {
      return "User Does not Exist";

    }
    else{
      return response.data;

    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUserData;

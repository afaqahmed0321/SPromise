import axios from 'axios';

const GetUserData = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/getUsersData?userNo=' + userN;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data; 
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
};

export default GetUserData;

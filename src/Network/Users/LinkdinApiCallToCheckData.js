import axios from 'axios';

const LinkDinApiCallToCheckData = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/checkLinkedIn?userNo='+userN;
  console.log(userN)
  try {
    const response = await axios.get(apiUrl);
    return response.data.code
    

  } catch (error) {
    
    
    console.log(error)
  }
};

export default LinkDinApiCallToCheckData;
import axios from 'axios';

const TwitterApiCallLogin = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/twitter?userNo='+userN;
  console.log("user noooooooooo",userN)
  try {
   
    const response = await axios.get(apiUrl);
    return response.data.url ;
    

  } catch (error) {
  
    console.log(error)
  }
};

export default TwitterApiCallLogin;
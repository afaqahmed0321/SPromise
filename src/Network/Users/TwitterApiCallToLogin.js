// const url = 'http://138.197.52.199:8080/savePromise';
// import React from 'react'
// import {ToastAndroid} from 'react-native'


import axios from 'axios';
// import { ToastAndroid } from 'react-native';

const TwitterApiCallLogin = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/twitter?userNo='+userN;
  console.log(userN)
  try {
    // console.log("Try Case")
    const response = await axios.get(apiUrl);
    // console.log(response.data.url)
    return response.data.url ;
    // return response.data.code
    

  } catch (error) {
  
    console.log(error)
    // return [];
  }
};

export default TwitterApiCallLogin;
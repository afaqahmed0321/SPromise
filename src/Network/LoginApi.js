import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://snappromise.com:8080',
  timeout: 10000, // Set your desired timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Modify request config here if needed
    const modifiedConfig = { ...config };
    // Add headers or perform other tasks before sending the request
    modifiedConfig.headers.Accept = '*/*';
    return modifiedConfig;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Modify response data or handle success responses
    const responseData = response.data;
    console.log(responseData, 'responseData');
    console.log(responseData.message, 'data');

    if (responseData.message === 'Success') {
      console.log(responseData.message, 'here');
      return responseData;
    } else {
      console.log('', 'returning');
      return '';
    }
  },
  error => {
    // Handle response errors
    return Promise.reject(error);
  }
);

// Log interceptor addition
console.log('Request and response interceptors added.');

export async function login(email,password) {
  console.log("here")
  const headers = new Headers({
    Accept: '*/*',
  });
  const formdata = new FormData();

  formdata.append('email', email.toLowerCase());
  formdata.append('password', password);

  try {
    const response = await fetch("https://snappromise.com:8080/Login", {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    console.log(responseData,"responseData in Login APi")
    // console.log(data.message,"data")

    if (data.message === 'Success') {
      // console.log(data.message,"here")
      return data;
    } else {
      console.log("","returning")
      return "";
    }
  } catch (error) {
    return -2;
  }
};

export async function Sociallogin(email, socialLogin) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('socialLogIn', socialLogin);

    const response = await axiosInstance.post('/Login', formData);

    return response.data;
  } catch (error) {
    return -2; // Return custom error code for request failure
  }
}

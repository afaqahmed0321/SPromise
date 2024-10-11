import axios from 'axios';
import { API_URL } from '../../helper';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
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
    if (responseData.message === 'Success') {
      return responseData;
    } else {
      return '';
    }
  },
  error => {
    // Handle response errors
    return Promise.reject(error);
  }
);
const handleEmailChange = (text) => {
    // Convert to lowercase and remove spaces
    const formattedText = text.toLowerCase().replace(/\s/g, '');
    // Validate email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formattedText);

    // Update state only if the input is a valid email
    if (isValidEmail) {
      setEmailID(formattedText);
    }
  };
// Log interceptor addition
export async function login(email,password) {
  const headers = new Headers({
    Accept: '*/*',
  });
  const formdata = new FormData();

  formdata.append('email', email.toLowerCase());
  formdata.append('password', password);

  try {
    const response = await fetch(`${API_URL}/Login`, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    if (data.message === 'Success') {
      return data;
    } else {
      return "";
    }
  } catch (error) {
    return -2;
  }
};

export async function Sociallogin(email, socialLogin) {
  const headers = new Headers({
    Accept: '*/*',
  });
  try {

    console.log('emailllllll', email);
    console.log('social', socialLogin);


    const formData = new FormData();
    formData.append('email', email);
    formData.append('socialLogIn', socialLogin);

    const response = await fetch(`${API_URL}/Login`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    console.log("dattttt", data);
    return data;
  } catch (error) {
    return -2;
  }
}

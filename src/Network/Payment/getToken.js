
import axios from 'axios';

export const GetPaymentToken = () => {
  return axios.get('https://snappromise.com:8080/getPaymentToken', {
    headers: {
      'Accept': '*/*',
    },
  })
  .then(response => response.data)
  .catch(error => {
    throw error; 
  });
};

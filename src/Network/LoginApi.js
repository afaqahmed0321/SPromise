import axios from 'axios';

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
    console.log(responseData,"responseData")
    console.log(data.message,"data")

    if (data.message === 'Success') {
      console.log(data.message,"here")
      return data;
    } else {
      console.log("","returning")
      return "";
    }
  } catch (error) {
    return -2;
  }
};

export async function Sociallogin(email,socialLogin) {
  console.log("here")
  const headers = new Headers({
    Accept: '*/*',
  });
  const formdata = new FormData();
  formdata.append('email', email);
  formdata.append('socialLogIn', socialLogin);

  try {
    const response = await fetch("https://snappromise.com:8080/Login", {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    console.log(responseData,"responseData")
    console.log(data.message,"data")

    if (data.message === 'Success') {
      console.log(data.message,"here")
      return data;
    } else {
      console.log("","returning")
      return "";
    }
  } catch (error) {
    return -2;
  }
};

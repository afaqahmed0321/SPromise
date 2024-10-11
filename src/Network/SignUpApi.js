import { API_URL } from "../../helper";

export async function signup(emailID, password, fName, lName, subscription) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body=
  {
    "emailID": emailID,
     "password": password,
     "firstName": fName,
     "lastName": lName,
     "subscription": subscription,
     "loginType": "Manual",
     "status": "Active"
   }
  try {
    const response = await fetch(`${API_URL}/api/Users/signUp`, {
      method: 'POST',
      headers: headers,
    body: JSON.stringify(body)
});
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    if (data.message === 'Operation completed successfully.') {
      return "Registered";
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
};

export async function Socialsignup(emailID,Name,socialLogin,imageURL, sSubscription) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body=
  {
    "emailID": emailID,
     "password": "",
     "firstName": Name,
     "lastName": "",
     "status": "Active",
     "socialLogin":socialLogin,
     "loginType": "Google",
     "imageURL":imageURL ? imageURL : '',
     "subscription": sSubscription
   }
  try {
    const response = await fetch(`${API_URL}/api/Users/signUp`, {
      method: 'POST',
      headers: headers,
    body: JSON.stringify(body)
});
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    if (data.message === 'Operation completed successfully.') {
      return "Registered";
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
};


export async function Applesignup(emailID,Name,socialLogin,imageURL, sSubscription) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body=
  {
    "emailID": emailID,
     "password": "",
     "firstName": Name,
     "lastName": "",
     "status": "Active",
     "socialLogin":socialLogin,
     "loginType": "Apple",
     "imageURL":imageURL ? imageURL : '',
     "subscription": sSubscription
   }
  try {
    const response = await fetch(`${API_URL}/api/Users/signUp`, {
      method: 'POST',
      headers: headers,
    body: JSON.stringify(body)
});
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    if (data.message === 'Operation completed successfully.') {
      return "Registered";
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
};

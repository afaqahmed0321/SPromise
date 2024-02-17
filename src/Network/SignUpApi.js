

// export default signup = async (emailID, password, fName, lName) => {
//         console.log(emailID, password)
//        userID = '212910'
//     const url = 'http://138.197.52.199:8080/api/Users/signUp'
//     let result = await fetch (url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//           },
//         body: JSON.stringify({userID, emailID, password, fName, lName})
//     })
//         result = await result.json();
//         console.warn(result);
   
// };

export async function signup(emailID, password, fName, lName, subscription) {
  console.log(emailID, password, fName, lName,subscription,"signup")
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
    const response = await fetch("https://snappromise.com:8080/api/Users/signUp", {
      method: 'POST',
      headers: headers,
    body: JSON.stringify(body)
});
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    console.log(data,"data")

    if (data.message === 'Operation completed successfully.') {
      return "Registered";
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
};

export async function Socialsignup(emailID,Name,socialLogin,imageURL) {
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
     "imageURL":imageURL

   }
  try {
    const response = await fetch("https://snappromise.com:8080/api/Users/signUp", {
      method: 'POST',
      headers: headers,
    body: JSON.stringify(body)
});
    const responseData = await response.text();
    const data = JSON.parse(responseData);
    console.log(data,"data")

    if (data.message === 'Operation completed successfully.') {
      return "Registered";
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
};


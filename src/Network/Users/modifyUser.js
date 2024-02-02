
export async function UpdateProfileApi(
  useN,
  email,
  password,
  fNam,
  lNam,
  gende,
  dom,
  countr,
  pinCod,
  stat,
  cit,
  addres,
  phoneN,
  socialLogi,
) {
  console.log('API Section', useN, email, password, fNam, lNam, gende, dom, countr, pinCod, stat, cit, addres, phoneN, socialLogi);

  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body = {
    "userNo": useN,
    "emailID": email,
    "password": password,
    "firstName": fNam,
    "lastName": lNam,
    "address1": addres,
    "address2": "",
    "city": cit,
    "state": "",
    "zip": pinCod,
    "country": countr,
    "phoneNo": phoneN,
    "status": "",
    "userType": "",
    "isactive": false,
    "role": "",
    "gender": gende,
    "loginType": "",
    // "imageURL": "",
    "idToken": "",
    "socialLogin": socialLogi
  };
  console.log(body, 'Body Sec');
  try {
    const response = await fetch(
      'https://snappromise.com:8080/api/Users/modifyUser',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      },
    );
    console.log(response);

    const responseData = await response.text();
    console.log(responseData,"resp dat");

    const data = JSON.parse(responseData);
    console.log(data, 'data');

    if (data.code === 200) {
    //   return 'Registered';
    //   ToastAndroid.showWithGravityAndOffset(
    //     'Data Successfully Updated',
    //     ToastAndroid.LONG,
    //     ToastAndroid.BOTTOM,
    //     25,
    //     50,

    //   );
      return data;
    } else {
      return data.description;
      console.log("try is completed");
    }
  } catch (error) {
    console.log("i am catch error". error);
    return -2;
  }
}

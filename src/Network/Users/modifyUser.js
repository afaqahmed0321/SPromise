
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
    "address1": addres,
    "address2": "",
    "phoneNo": phoneN,
    "firstName": fNam,
    "lastName": lNam,
    "gender": gende,
    "country": countr,
    "state": stat.slice(0, 2),
    "city": cit,
    "userNo": useN,
  };
  console.log(body, 'Body Sec');
  try {
    const response = await fetch(
      'https://snappromise.com:8080/api/Users/modifyProfileData',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      },
    );
    console.log("profile update ",response);

    const responseData = await response.text();
    console.log(responseData,"resp dat");

    const data = JSON.parse(responseData);
    console.log(data, 'data');

    if (data.code === 200) {
   
      return data;
    } else {
      return data.description;
    }
  } catch (error) {
    console.log("i am catch error". error);
    return -2;
  }
}

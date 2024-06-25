
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
    "state": stat,
    "city": cit,
    "userNo": useN,
  };
  try {
    const response = await fetch(
      'https://snappromise.com:8080/api/Users/modifyProfileData',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      },
    );

    const responseData = await response.text();

    const data = JSON.parse(responseData);

    if (data.code === 200) {
   
      return data;
    } else {
      return data.description;
    }
  } catch (error) {
    return -2;
  }
}

const UpdatedPassword = async (userN, NewPass) => {
  const userNo = userN;
  const newPassword = NewPass;

  try {
    const response = await fetch(
      `https://snappromise.com:8080/api/Users/updatePassword?userNo=${userNo}&password=${newPassword}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'text/plain', 
        },
      }
    );
    return response
  } catch (error) {
    console.error('Error updating password:', error.message);
  }
};

export default UpdatedPassword;


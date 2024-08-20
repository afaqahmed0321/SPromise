import { API_URL } from "../../../helper";

const UpdatedPassword = async (userN, NewPass) => {
  const userNo = userN;
  const newPassword = NewPass;

  try {
    const response = await fetch(
      `${API_URL}/api/Users/updatePassword?userNo=${userNo}&password=${newPassword}`,
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


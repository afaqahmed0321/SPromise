// // import axios from 'axios';

// // const apiUrl = 'https://snappromise.com:8080/api/Users/updatePassword';
// // // const userNo = "41a7db9b-632b-4fb0-90df-ab81a82f8a71";

// // const UpdatedPassword = (userN,NewPass) => {
// //   // console.log(userN)
// //   return new Promise((resolve, reject) => {
// //     axios.get(apiUrl, {
// //       params: {
// //         "userNo": userN,
// //         "password": NewPass
// //       },
// //     })
// //     .then((response) => {
// //       resolve(response);
// //     })
// //     .catch((error) => {
// //       reject(error);
// //     });
// //   });
// // };

// // export default UpdatedPassword;


//  const UpdatedPassword = async (userN,NewPass) => {
//     // console.log(userN)
//     console.log("Api Call", userN)
//     console.log("Api Call",NewPass)
//     const userNo = userN;
//     const newPassword = NewPass;
  
//     try {
//       const response = await fetch(`https://snappromise.com:8080/api/Users/updatePassword?userNo=${userNo}&password=${encodeURIComponent(newPassword)}`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'text/plain',
//         },
//       });
  
//       if (response.ok) {
//         console.log('Password updated successfully');
//         console.log(response)
//       } else {
//         console.error('Failed to update password:', response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating password:', error.message);
//     }
//   };
  
// export default UpdatedPassword;

const UpdatedPassword = async (userN, NewPass) => {
    console.log("Api Call", userN);
    console.log("Api Call", NewPass);
    const userNo = userN;
    const newPassword = NewPass;
  
    try {
      const response = await fetch(
        `https://snappromise.com:8080/api/Users/updatePassword?userNo=${userNo}&password=${newPassword}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'text/plain', // Change to 'application/json'
          },
        }
      );
        console.log(response);
      if (response.ok) {
        const responseData = await response.json();
  
        if (responseData.code === 200) {
          // Password updated successfully
          console.log('Password updated successfully');
          console.log(responseData);
          return responseData.code;
        } else {
          // Handle unsuccessful response
          console.error('Failed to update password:', responseData.description);
        }
      } else {
        // Handle non-OK response
        console.error('Failed to update password:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error updating password:', error.message);
    }
  };
  
  export default UpdatedPassword;
  
 
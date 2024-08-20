// actions.js

import AcceptPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/AcceptPromiseRequestApi";
import RejectPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/RejectPromiseRequestApi";

export const handleAccept = async (promiseID, userN, navigation) => {
  try {
    const response = await AcceptPromiseRequestApi(promiseID, userN);
    console.log("codeeeeeee", response);

    if (response.code === 100) {
      // Navigate to the Dashboard on successful API response
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Dashboard', { promiseID });
      } else {
        console.error("Navigation prop is undefined or navigate is not a function");
      }
    }
    return response;
  } catch (error) {
    console.error("Error in handling accept promise", error);
    throw error;
  }
};

export const handleReject = async (promiseID, userN) => {
  return await RejectPromiseRequestApi(promiseID, userN);
};

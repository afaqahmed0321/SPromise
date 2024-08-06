// actions.js

import AcceptPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/AcceptPromiseRequestApi";
import RejectPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/RejectPromiseRequestApi";



export const handleAccept = async (promiseID, userN) => {
  return await AcceptPromiseRequestApi(promiseID, userN);
};

export const handleReject = async (promiseID, userN) => {
  return await RejectPromiseRequestApi(promiseID, userN);

};
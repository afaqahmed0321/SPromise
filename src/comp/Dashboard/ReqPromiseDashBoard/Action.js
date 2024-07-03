// actions.js

import AcceptPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/AcceptPromiseRequestApi";
import RejectPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/RejectPromiseRequestApi";



export const handleAccept = async (promiseID, userN) => {
  const res = await AcceptPromiseRequestApi(promiseID, userN);
  return 1;
};

export const handleReject = async (promiseID, userN) => {
  const res = await RejectPromiseRequestApi(promiseID, userN);
  return 1;

};
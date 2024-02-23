// actions.js

import AcceptPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/AcceptPromiseRequestApi";
import RejectPromiseRequestApi from "../../../Network/Dashboard/PromiseReq/Actions/RejectPromiseRequestApi";



export const handleAccept = async(promiseID, userN) => {
    // console.log(`Accept button pressed for promise ID: ${promiseID}`)
    // console.log(`UserNo: ${userN}`)

   const res = await AcceptPromiseRequestApi(promiseID, userN)
    
  };
  
  export const handleReject = async(promiseID, userN) => {
    console.log(promiseID, userN, "Rejecting")
   const res = await RejectPromiseRequestApi(promiseID, userN)
    
  };
import AcceptPromiseApi from "../../../Network/Dashboard/Promises/Actions/AcceptPromiseApi";
import CompletePromiseApi from "../../../Network/Dashboard/Promises/Actions/CompletePromiseApi";
import FailPromiseApi from "../../../Network/Dashboard/Promises/Actions/FailPromiseApi";
import RejectPromiseApi from "../../../Network/Dashboard/Promises/Actions/RejectPromiseApi";
import FulfilledPromiseApi from "../../../Network/Dashboard/Promises/Actions/FulfilledPromiseApi";
import FailedPromiseApi from "../../../Network/Dashboard/Promises/Actions/FailedPromiseApi"; 



export const handleAcceptPromise = (promiseID, userN) => {
   return AcceptPromiseApi(promiseID, userN);
  };
  
  export const handleRejectPromise = async(promiseID, userN) => {
   return RejectPromiseApi(promiseID, userN);    
  };
  export const handleCompletePromise = async(promiseID, userN, note) => {
   const res = await CompletePromiseApi(promiseID, userN,note);
   console.log("response from actionsssss", res);
   return res;
  };
  export const handleFulfilledPromiseApi = async(promiseID, userN) => {
   return FulfilledPromiseApi(promiseID, userN);

  };
  export const handleFailedPromiseApi = async(promiseID, userN) => {
   return FailedPromiseApi(promiseID, userN);

  };
  export const handleFailPromise = async(promiseID, userN) => {
   return FailPromiseApi(promiseID, userN);

  };
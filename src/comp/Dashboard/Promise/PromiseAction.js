
import AcceptPromiseApi from "../../../Network/Dashboard/Promises/Actions/AcceptPromiseApi";
import CompletePromiseApi from "../../../Network/Dashboard/Promises/Actions/CompletePromiseApi";
import FailPromiseApi from "../../../Network/Dashboard/Promises/Actions/FailPromiseApi";
import RejectPromiseApi from "../../../Network/Dashboard/Promises/Actions/RejectPromiseApi";
import FulfilledPromiseApi from "../../../Network/Dashboard/Promises/Actions/FulfilledPromiseApi";
import FailedPromiseApi from "../../../Network/Dashboard/Promises/Actions/FailedPromiseApi";



export const handleAcceptPromise = async(promiseID, userN) => {
   const res = await AcceptPromiseApi(promiseID, userN)
  };
  
  export const handleRejectPromise = async(promiseID, userN) => {
   const res = await RejectPromiseApi(promiseID, userN)
    
  };
  export const handleCompletePromise = async(promiseID, userN, note) => {
   const res = await CompletePromiseApi(promiseID, userN,note)
    
  };
  export const handleFulfilledPromiseApi = async(promiseID, userN) => {
   const res = await FulfilledPromiseApi(promiseID, userN)
  };
  export const handleFailedPromiseApi = async(promiseID, userN) => {
   const res = await FailedPromiseApi(promiseID, userN)
  };
  export const handleFailPromise = async(promiseID, userN) => {
   const res = await FailPromiseApi(promiseID, userN)
  };
 

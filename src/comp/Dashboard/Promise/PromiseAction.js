
import AcceptPromiseApi from "../../../Network/Dashboard/Promises/Actions/AcceptPromiseApi";
import CompletePromiseApi from "../../../Network/Dashboard/Promises/Actions/CompletePromiseApi";
import FailPromiseApi from "../../../Network/Dashboard/Promises/Actions/FailPromiseApi";
import RejectPromiseApi from "../../../Network/Dashboard/Promises/Actions/RejectPromiseApi";
import { useNavigation } from '@react-navigation/native';



export const handleAcceptPromise = async(promiseID, userN) => {
    console.log(`Accept button pressed for promise ID: ${promiseID}`)
    // console.log(`UserNo: ${userN}`)

   const res = await AcceptPromiseApi(promiseID, userN)
    
  };
  
  export const handleRejectPromise = async(promiseID, userN) => {
    console.log(promiseID, userN)
   const res = await RejectPromiseApi(promiseID, userN)
    
  };
  export const handleCompletePromise = async(promiseID, userN) => {
    console.log(promiseID, userN)
   const res = await CompletePromiseApi(promiseID, userN)
    
  };
  export const handleFailPromise = async(promiseID, userN) => {

    console.log(promiseID, userN)
   const res = await FailPromiseApi(promiseID, userN)
    
  };
  // export const handelViewAttachedMedia = async() => {
   
  // };


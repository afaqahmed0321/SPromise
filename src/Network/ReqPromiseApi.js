
import { ToastAndroid } from 'react-native';
import { PromiseType } from '../recoil/AddPromise';

const url = 'https://snappromise.com:8080/savePromiseRequest';

const ReqPromiseApi = async (expiryDate, IsTimeBound, promiseGoal, promiseMediaU,promiseType,promisee, promisor, RatingImapect, LinkDin, Twitter, startDate, status, paymentAmount, paymentStatus, PromiseReward, PromiseStatus, visibility)=> {
  const requestBody = {
    "expiryDate": expiryDate,
    "isTimeBound": IsTimeBound,
    "promiseGoal": promiseGoal,
    "promiseMediaURL": promiseMediaU,
    "promiseRequestID": "00000000-0000-0000-0000-000000000000",
    "promiseType": promiseType,
    "promisee": promisee,
    "promisor": promisor,
    "ratingImpact": RatingImapect,
    "shareonLinkedIn": LinkDin,
    "shareonTwitter": Twitter,
    // "startDate": startDate,
    "status": status,
    "userPromisePayment": {
        "PaymentStatus": paymentStatus,
      "paymentAmount": paymentAmount
    },
    userPromiseReward: PromiseReward !== null ? { rewardPoints: PromiseReward } : null,
    // "PaymentStatus": paymentStatus,
    // "userPromisePayment": paymentAmount,
    // "userPromiseReward": PromiseReward,
    // "userPromiseReward": {
    //   "Status": "Pending",
    //   "rewardPoints": PromiseReward
    // },
    // "Status": "Pending",
    // "rewardPoints": PromiseReward,
    "visibility": visibility
  };

  console.log(requestBody, 'Api Call')

  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      },
      body: JSON.stringify (requestBody)
    });

    result = await result.json();
    console.log("resultttt",result)
    if (result.code === 500) {
      return result.code
      ToastAndroid.showWithGravityAndOffset(
        'Your promise request has been successfully Sent',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Unexpected Error', result.code,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  } catch (error) {
    console.error('Error during API call:', error);
    // Handle the error as needed
  }
};

export default ReqPromiseApi;

// import React from 'react'
// import {ToastAndroid} from 'react-native'

// const url = 'http://138.197.52.199:8080/savePromiseRequest';



// const ReqPromiseApi = async (Promisee, PromiseDate, PromiseType, ExpiryDate, Promisor, IsTimeBound, PromiseGoal, ) => {
//   const formdata = new FormData();
//   // console.log(Promisee, PromiseDate, PromiseType, ExpiryDate, Promisor, IsTimeBound, PromiseGoal,PromisAmo, PromiseRew, 'req promise api called');

//   formdata.append('Promisee', Promisee)
//   formdata.append('Promisor', Promisor)
//   formdata.append('PromiseType', PromiseType)
//   formdata.append('PromiseGoal', PromiseGoal)
//   formdata.append('PromiseDate', PromiseDate)
//   formdata.append('PromiseDate', PromiseDate)
//   formdata.append('ExpiryDate', ExpiryDate)
//   formdata.append('IsTimeBound', IsTimeBound)
//   // formdata.append('UserPromisePayment.PaymentAmount', PromisAmo)
//   formdata.append('Status', "Pending")
  

 
//     let result = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Accept': 'text/plain'
//       },
//       body: formdata
//     });

//     result = await result.json(); // Response is expected to be text/plain
//     // console.warn(result);
    
//     ToastAndroid.showWithGravityAndOffset(
//       'Your promise request has been successfully sent.',
//       ToastAndroid.LONG,
//       ToastAndroid.BOTTOM,
//       25,
//       50,
//     );
 
// };

// export default ReqPromiseApi;

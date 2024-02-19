
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

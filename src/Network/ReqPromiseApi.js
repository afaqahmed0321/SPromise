import { ToastAndroid } from 'react-native';

const url = 'https://snappromise.com:8080/savePromiseRequest';

const ReqPromiseApi = async (
  expiryDate,
  IsTimeBound,
  promiseGoal,
  promiseMediaU,
  promiseType,
  promisee,
  promisor,
  RatingImapect,
  LinkDin,
  Twitter,
  startDate,
  status,
  paymentAmount,
  paymentStatus,
  PromiseReward,
  PromiseStatus,
  visibility,
) => {

  console.log("before call appi in review",
    {
      expiryDate: expiryDate,
      isTimeBound: IsTimeBound,
      promiseGoal: promiseGoal,
      promiseMediaURL: promiseMediaU,
      promiseRequestID: '00000000-0000-0000-0000-000000000000',
      promiseType: promiseType,
      promisee: promisee,
      promisor: promisor,
      ratingImpact: RatingImapect,
      shareonLinkedIn: LinkDin,
      shareonTwitter: Twitter,
      status: status,
      userPromisePayment: {
        PaymentStatus: paymentStatus,
        paymentAmount: paymentAmount,
      },
      userPromiseReward:
        PromiseReward !== null ? { rewardPoints: PromiseReward } : null,

      visibility: visibility,
    }
  )

  const requestBody = {
    expiryDate: expiryDate,
    isTimeBound: IsTimeBound,
    promiseGoal: promiseGoal,
    promiseMediaURL: promiseMediaU,
    promiseRequestID: '00000000-0000-0000-0000-000000000000',
    promiseType: promiseType,
    promisee: promisee,
    promisor: promisor,
    ratingImpact: RatingImapect,
    shareonLinkedIn: LinkDin,
    shareonTwitter: Twitter,
    status: status,
    userPromisePayment: {
      PaymentStatus: paymentStatus,
      paymentAmount: paymentAmount,
    },
    userPromiseReward:
      PromiseReward !== null ? { rewardPoints: PromiseReward } : null,

    visibility: visibility,
  };

  console.log(requestBody, 'Api Call');

  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(requestBody),
    });

    results = await result.json();
    console.log('resultttt', results);
    if (results.code === 100) {
      ToastAndroid.showWithGravityAndOffset(
        'Your promise request has been successfully Sent',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return results.code;
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Unexpected Error',
        result.code,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    return results.code;

  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default ReqPromiseApi;

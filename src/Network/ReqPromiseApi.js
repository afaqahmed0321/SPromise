import Toast from 'react-native-toast-message';
import { API_URL } from '../../helper';
const url = `${API_URL}/savePromiseRequest`;

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
  console.log("before call api in review",
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
        PromiseReward !== null ? { rewardPoints: PromiseReward, Status: 'Pending' } : null,
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
    userPromiseReward: PromiseReward !== null ? { rewardPoints: PromiseReward, Status: 'Pending' } : null,
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

    const results = await result.json();
    console.log('result', results);

    if (results.code === 100) {
      Toast.show({
        type: 'success',
        text1: 'Your promise request has been ',
        text2: 'successfully sent.',
        text1Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        text2Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        swipeable: true,
        text1NumberOfLines: 0,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        swipeable: true,
        autoHide: true,
        topOffset: 0,
        bottomOffset: 40,
      });
    }

    return results.code;

  } catch (error) {
    console.error('Error during API call:', error);
  }
};

export default ReqPromiseApi;

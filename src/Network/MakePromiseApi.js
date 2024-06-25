import axios from 'axios';

const url = 'https://snappromise.com:8080/savePromise';

const MakePromiseApi = async (
  expiryDate,
  IsTimeBound,
  promiseGoal,
  promiseMediaU,
  PromiseID,
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
  visibility,
) => {
  const requestBody = {
    expiryDate: expiryDate,
    isTimeBound: IsTimeBound,
    promiseGoal: promiseGoal,
    promiseMediaURL: promiseMediaU,
    promiseRequestID: PromiseID,
    promiseType: promiseType,
    promisee: promisee,
    promisor: promisor,
    ratingImpact: RatingImapect,
    shareonLinkedIn: LinkDin,
    shareonTwitter: Twitter,
    startDate: startDate,
    status: status,
    userPromisePayment: paymentAmount !== null ? {
      paymentAmount: paymentAmount,
      PaymentStatus: paymentStatus,
    } : null,
    visibility: visibility,
    userPromiseReward: PromiseReward !== null ? { rewardPoints: PromiseReward } : null,
  };
  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    });
    return response.data.code;
  } catch (error) {
    console.error('Error during API call:', error);
}
};

export default MakePromiseApi;

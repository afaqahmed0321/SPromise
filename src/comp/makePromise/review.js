import { StyleSheet, Text, View, ScrollView, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Headings } from '../../Styling/Headings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useRecoilState } from 'recoil';
import {
  promiseType,
  promiseAmounnt,
  deadline,
  promiseStatement,
  MakeaPromise,
  BgMakeaPromise,
  RequestaPromise,
  isSelectModalVisible,
  selectedPromisee,
  startDate,
  IsTimeBound,
  UserNo,
  promiseReward,
  selectedMedia,
  isPublicvisiblity,
  selectedReqPromiseId,
  EditPromiseReq,
  RatingImapect,
  RewardPoints,
  RewardPointsState,
} from '../../recoil/AddPromise';
import ToggleSwitch from 'toggle-switch-react-native';
import { commonStyles } from '../../Styling/buttons';
import SelectPromise from './SelectPromisee';
import MakePromiseApi from '../../Network/MakePromiseApi';
import ReqPromiseApi from '../../Network/ReqPromiseApi';
import { ToastAndroid } from 'react-native';
import GetUserData from '../../Network/Users/GetUserData';
import LoadingOverlay from '../Global/LoadingOverlay';
import axios from 'axios';

const Review = ({ navigation }) => {
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);
  const [forType, setForType] = useState(false);

  console.log(Promiseze, 'Promiseze');

  const handlePromiseApi = async () => {
    setIsLoading(true);
    console.log('rewardPointState is ', rewardPointState);
    console.log('financial', financial);
    console.log('isRating', isRating);
    const expiryDate = isTimeB ? deadlinedate : dateString;
    const IsTimeBound = isTimeB;
    const promiseGoal = generatedTexts;
    const promiseMediaU = attachMedia;
    const PromiseID = editPromiseReq ? selectedReqPromiseID : '00000000-0000-0000-0000-000000000000';
    const promiseType = 'GUARANTEE';
    const promisee = Promiseze.networkUserNo;
    const promisor = userN;
    const RatingImapect = isRating;
    const LinkDin = Igtoggle;
    const Twitter = fbtoggle;
    const startDate = isTimeB ? promidate : dateString;
    const status = 'Pending';
    const paymentAmount = financial ? amount : '0';
    const paymentStatus = 'Pending';
    const PromiseReward = financial ? rewardPoints : null;
    const visibility = mNtoggle ? 'PUBLIC' : 'PRIVATE';

    console.log("Data before sending",
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
      amount,
      paymentStatus,
      PromiseReward,
      visibility,)

    try {
      const prom = await MakePromiseApi(
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
      );
      console.log("prommmmmm", prom);
      if (prom === 100) {
        console.log("running in make promise at line 96");
        navigation.navigate('SnapPromiseVerification');
      } else {
        console.log("error in make promise at line 96");
        ToastAndroid.showWithGravityAndOffset(
          'Buy Subscription to make more promises',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
    catch (error) {
      console.error('Error making promise:', error);
    } finally {
      setIsLoading(false);
    }

    const userNo = Promiseze.userNo;


  };

  const handelReqPromiseApi = async () => {
    console.log('Req Promise Called');
    const expiryDate = isTimeB ? deadlinedate : dateString;
    const IsTimeBound = isTimeB;
    const promiseGoal = generatedTexts;
    const promiseMediaU = attachMedia ? attachMedia : "";
    const promiseType = 'COMMITMENT';
    const promisee = Promiseze.networkUserNo;
    const promisor = userN;
    const RatingImapect = isRating;
    const LinkDin = Igtoggle;
    const Twitter = fbtoggle;
    const startDate = isTimeB ? promidate : dateString;
    const status = 'Pending';
    const paymentAmount = financial ? amount : 0;
    const paymentStatus = 'Pending';
    // const PromiseReward = rewardPointState ? rewardPoints : null;
    const PromiseReward = financial ? rewardPoints : 0;
    const PromiseStatus = 'Pending';
    const visibility = mNtoggle ? 'PUBLIC' : 'PRIVATE';

    const prom = await ReqPromiseApi(
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
    );
    console.log("prom from 167", prom)
    if (prom === 100) {
      navigation.navigate('SnapPromiseVerification');
    }
  };


  const [userN, setUserN] = useRecoilState(UserNo);
  const [preward, setPreward] = useRecoilState(promiseReward);
  const [isRating, setIsRating] = useRecoilState(RatingImapect);

  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);

  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];

  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  makePromise ? promiseType == 'GUARANTEE' : promiseType == "COMMITMENT"
  console.log(makePromise, 'makePromise');
  const [modalVisible, setModalVisible] = useRecoilState(isSelectModalVisible);
  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [deadlinedate, setDeadLinedate] = useRecoilState(startDate);

  const [promidate, setPromidate] = useRecoilState(startDate);
  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);
  const [rewardPoints, setRewardPoints] = useRecoilState(RewardPoints);
  const [rewardPointState, setRewardPointState] =
    useRecoilState(RewardPointsState);

  const [attachMedia, setAttachMedia] = useRecoilState(selectedMedia);

  const [selectedReqPromiseID, setSelectedReqPromiseID] =
    useRecoilState(selectedReqPromiseId);
  const [editPromiseReq, setEditPromiseReq] = useRecoilState(EditPromiseReq);

  const currentDate = new Date();
  const dateString = currentDate.toISOString();

  const [fbtoggle, setFBTogel] = useState(false);
  const [Igtoggle, setIgTogel] = useState(false);
  const [mNtoggle, setMNTogel] = useState(false);
  const [userData, setUserData] = useState();
  const [shareToggel, setShareToggel] = useState(false);
  const [xtoggle, setXTogel] = useState(false);
  const [financial, setFinancial] = useRecoilState(promiseType);
  const [isLoading, setIsLoading] = useState(false);
  const [LinkedInCode, setLinkedInCode] = useState(null);
  const [twitterCode, setTwitterCode] = useState(null);

  const getUser = async () => {
    const respon = await GetUserData(userN);
    const data = await respon;
    setUserData(data);

    const linkedinResp = await axios.get(`https://snappromise.com:8080/api/Users/checkLinkedIn?userNo=${userN}`)
      .then((res) => {
        console.log("linkedIn", res)
        setLinkedInCode(res?.data?.code)
      })
      .catch((err) => {
        return err
      })

    const twitterCode = await axios.get(`https://snappromise.com:8080/api/Users/checkTwitter?userNo=${userN}`)
      .then((res) => {
        console.log("Twitter", res)
        setTwitterCode(res?.data?.code)
      })
      .catch((err) => {
        return err
      })
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <ScrollView>
      {isLoading && <LoadingOverlay />}
      <View style={{ backgroundColor: '#E4EEE6', flex: 1 }}>
        <View style={{ width: wp(94), marginLeft: wp(4) }}>
          <Text style={[Headings.Input3, { marginTop: hp(2) }]}>
            {makePromise ? 'Select Promisee' : 'Select Promiser'}
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginTop: hp(1) }}>
            <LinearGradient
              colors={makePromise ? bgBtnmakeprms : bgBtnrqstprms}
              style={{ borderRadius: wp(9), width: wp(94) }}>
              <View
                style={{
                  width: wp(90),
                  height: hp(7),
                  borderRadius: wp(9),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

                <Image
                  source={
                    Promiseze?.imageURL === ''
                      ? {
                        uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                      }
                      : { uri: Promiseze.imageURL }
                  }
                  style={{
                    width: wp(12),
                    height: hp(6),
                    borderRadius: wp(12) / 2,
                    marginLeft: wp(4),
                  }}
                />
                <View style={{ width: wp(65), marginLeft: wp(3) }}>
                  <Text style={{ color: 'white' }}>
                    {Promiseze?.firstName} {Promiseze?.lastName}
                  </Text>
                  <Text style={{ color: 'white', width: wp(65) }}>
                    {Promiseze?.emailID}
                  </Text>
                </View>
                <View style={{}}>
                  <Feather color="white" name="edit-2" size={17} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <SelectPromise />
          </Modal>

          <View style={{ marginVertical: hp(1) }}>
            {console.log("this is user data ", userData)}
            <Text style={Headings.Input3}>Promise Details</Text>
          </View>
          <LinearGradient
            colors={!makePromise ? bgBtnrqstprms : bgBtnmakeprms}
            style={{ height: hp(51), width: wp(94), borderRadius: wp(10) }}>
            <View style={{ marginLeft: wp(5.5) }}>

              {financial ? (
                <View style={{ marginTop: hp(1) }}>
                  <View style={{ flexDirection: '', }}>
                    <View style={[, { paddingVertical: 5 }]}>
                      {makePromise ? (
                        <>
                          <View>
                            <Text
                              style={[
                                Headings.h3ForReviewpage,
                                { marginVertical: hp(0.5), fontSize: 18 },
                              ]}>
                              Promise Amount
                            </Text>
                            <Text style={[Headings.h3ForReviewpage, { fontSize: 28 }]}>
                              $ <Text>{amount}.00</Text>
                            </Text>
                          </View>
                        </>
                      ) : (
                        <>
                          <View>
                            <Text
                              style={[
                                Headings.h3ForReviewpage,
                                { marginVertical: hp(0.5), fontSize: 18 },
                              ]}>
                              Reward Amount
                            </Text>
                            <Text style={[Headings.h3ForReviewpage, { fontSize: 28 }]}>
                              $ <Text>{amount}.00</Text>
                            </Text>
                          </View>
                        </>
                      )}
                    </View>

                    <View style={[, { paddingVertical: 10 }]}>
                      {
                        rewardPoints ? (
                          <View>
                            <Text style={[Headings.h3ForReviewpage, { fontSize: 18 }]}>
                              Reward Points
                            </Text>
                            <Text style={[Headings.h3ForReviewpage, {}]}>{rewardPoints}</Text>
                          </View>
                        ) : null
                      }
                    </View>
                  </View>
                  <View style={styles.Line}></View>
                </View>
              ) : null}

              <View>
                {isTimeB ? (
                  <>
                    <View
                      View
                      style={{
                        marginVertical: hp(0.5),
                        flexDirection: '',
                        paddingVertical: 5
                      }}>
                      <Text style={[Headings.h3ForReviewpage, { fontSize: 18 }]}>
                        Completion Date{' '}
                      </Text>
                      <Text style={[Headings.h3ForReviewpage, { marginTop: 5 }]}>{deadlinedate}</Text>
                    </View>
                    <View style={styles.Line}></View>
                  </>
                ) : null}
              </View>
              {isRating ? (
                <View style={{}}>
                  <View>
                    <Text
                      style={[Headings.h3ForReviewpage, { marginVertical: hp(1), fontSize: 18 }]}>
                      Rating will Imapct
                    </Text>
                  </View>
                  <View style={styles.Line}></View>
                </View>
              ) : null}

              <View style={{}}>
                <Text style={[Headings.h3ForReviewpage, { paddingVertical: 5, fontSize: 18 }]}>Promise Statement</Text>
                <View style={{ height: hp(8), width: wp(80) }}>
                  <View style={[styles.generatedBox, { padding: 0, margin: 0 }]}>

                    <Text style={{ color: '#FFFFFF' }}> {generatedTexts} </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
          {/* Share  */}
          <View style={{ marginTop: hp(1) }}>
            <Text style={Headings.Input3}>Also share on </Text>
            <View>
              {/* <Text>Facebook</Text> */}
              {twitterCode === 400 ? (
                null
              ) : (
                <View style={styles.Social}>
                  <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                    Twitter
                  </Text>
                  <ToggleSwitch
                    isOn={fbtoggle}
                    style={{ marginRight: wp(5) }}
                    onColor="#FFFFFF"
                    offColor="#FFFFFF"
                    thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                    thumbOnStyle={{ backgroundColor: '#652D90' }}
                    size="small"
                    onToggle={() => {
                      fbtoggle ? setFBTogel(false) : setFBTogel(true);
                    }}
                  />
                </View>
              )}


              {LinkedInCode === 400 ? (
                null
              ) : (
                <View style={styles.Social}>
                  <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                    LinkedIn
                  </Text>
                  <ToggleSwitch
                    isOn={Igtoggle}
                    style={{ marginRight: wp(5) }}
                    onColor="#FFFFFF"
                    offColor="#FFFFFF"
                    thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                    thumbOnStyle={{ backgroundColor: '#652D90' }}
                    size="small"
                    onToggle={() => {
                      Igtoggle ? setIgTogel(false) : setIgTogel(true);
                    }}
                  />
                </View>
              )}

              <View style={styles.Social}>
                <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>Share</Text>
                <ToggleSwitch
                  isOn={shareToggel}
                  style={{ marginRight: wp(5) }}
                  onColor="#FFFFFF"
                  offColor="#FFFFFF"
                  thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                  thumbOnStyle={{ backgroundColor: '#652D90' }}
                  size="small"
                  onToggle={() => {
                    shareToggel ? setShareToggel(false) : setShareToggel(true);
                  }}
                />
              </View>
              {shareToggel ? (
                <View style={styles.Social}>
                  <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                    Public or Network only
                  </Text>
                  <ToggleSwitch
                    isOn={mNtoggle}
                    style={{ marginRight: wp(5) }}
                    onColor="#FFFFFF"
                    offColor="#FFFFFF"
                    thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                    thumbOnStyle={{ backgroundColor: '#652D90' }}
                    size="small"
                    onToggle={() => {
                      mNtoggle ? setMNTogel(false) : setMNTogel(true);
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View style={{ marginTop: hp(2.5) }}>
            <TouchableOpacity
              onPress={Promiseze ? (makePromise ? handlePromiseApi : handelReqPromiseApi) : null}
              disabled={!Promiseze}
              style={[commonStyles.lognBtn, { opacity: Promiseze ? 1 : 0.5 }]}>
              <LinearGradient
                colors={!makePromise ? bgBtnrqstprms : bgBtnmakeprms}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: wp(50),
                }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  Social: {
    flexDirection: 'row',
    width: wp(94),
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  Line: {
    width: wp(80),
    borderWidth: wp(0.2),
    borderColor: 'white',
    marginTop: hp(0.5),
  },
});

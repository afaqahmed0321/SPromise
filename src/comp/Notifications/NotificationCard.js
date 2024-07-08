import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { DashBoardStyling } from '../../Styling/DashBoard';
import {
  DetailsModalVi,
  NotificationData,
} from '../../recoil/Notifications/NotificationsStates';
import GetPromiseRequestById from '../../Network/Notifications/GetPromiseRequestbyID';
import GetPromiseById from '../../Network/Notifications/GetPromiseID';
import { useRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import Font from 'react-native-vector-icons/Fontisto';
import {
  EditPromiseReq,
  IsTimeBound,
  MakeaPromise,
  PaymentCheck,
  RewardCheck,
  UserNo,
  deadline,
  isEndDateModalV,
  isStartDateModalV,
  istimeBoundCheckBox1,
  istimeBoundCheckBox2,
  promiseAmounnt,
  promiseReward,
  promiseStatement,
  selectMedia,
  selectedPromisee,
  selectedReqPromiseId,
  selectedVideoR,
  startDate,
  upDatePromiseReq,
} from '../../recoil/AddPromise';
import { Headings } from '../../Styling/Headings';
import { commonStyles } from '../../Styling/buttons';
import {
  handleAccept,
  handleReject,
} from '../Dashboard/ReqPromiseDashBoard/Action';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import {
  handleAcceptPromise,
  handleCompletePromise,
  handleFailPromise,
} from '../Dashboard/Promise/PromiseAction';
import { ToastAndroid } from 'react-native';

const NotificationCard = () => {
  const navigation = useNavigation();
  const [promise, setPromise] = useState({});

  const [isModalV, setIsModalV] = useRecoilState(DetailsModalVi);
  const [noti, setNoti] = useRecoilState(NotificationData);

  const focus = useIsFocused();
  const [selectedMedia, setSelectedMedia] = useRecoilState(selectMedia);

  const [selectitem, setSelectitem] = useState({});
  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(startDate);
  const [paymentCheck, setpaymentCheck] = useRecoilState(PaymentCheck);
  const [rewardCheck, setrewardCheck] = useRecoilState(RewardCheck);
  const [preward, setPreward] = useRecoilState(promiseReward);
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [startDateMV, setStartDateMV] = useRecoilState(isStartDateModalV);
  const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV);
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);
  const [selectedReqPromiseID, setSelectedReqPromiseID] =
    useRecoilState(selectedReqPromiseId);
  const [editPromiseReq, setEditPromiseReq] = useRecoilState(EditPromiseReq);

  const [isChecked1, setIsChecked1] = useState(istimeBoundCheckBox1);
  const [isChecked2, setIsChecked2] = useState(istimeBoundCheckBox2);

  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);

  const handelAttachedMedia = urll => {
    setSelectedVideo(urll);
    navigation.navigate('Player');
  };
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [editPReq, setEditPReq] = useRecoilState(upDatePromiseReq);
  const [promises, setPromises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userN, setUserN] = useRecoilState(UserNo);
  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];
  const notiMethod = noti.notificationMethod;

  const fetchPromise = async () => {
    const docNo = noti.docNo;

    // setSelectitem(data);([]);
    if (notiMethod == 'Promise') {
      await GetPromiseById(docNo)
        .then(data => {
          if (data.code === 200) {
            setSelectitem(data.promisesList[0]);
            setIsLoading(false);
          } else {
            setIsModalV(false),
              ToastAndroid.showWithGravityAndOffset(
                "There's no data",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
          }
        })
        .catch(error => {
        });
    } else if (notiMethod == 'RequestPromise') {

      await GetPromiseRequestById(docNo)
        .then(data => {
          if (data.code === 200) {
            setSelectitem(data.promiseRequestList[0]);
            setIsLoading(false);
          } else {
            setIsModalV(false),
              ToastAndroid.showWithGravityAndOffset(
                "There's no data",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
          }


        })
        .catch(error => {
          console.error('Error fetching promise:', error);
        });
    } else {
      setIsModalV(false);
      ToastAndroid.showWithGravityAndOffset(
        "There's no data",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  useEffect(() => {
    fetchPromise();
  }, [focus]);
  const handleCloseModal = () => {
    setIsModalV(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.overlay}>
          <View style={{ height: hp(25) }}>
          </View>
          <View>
            {isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp(2),
                  // width:wp(2)
                }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(35),
                    width: wp(90),
                    alignSelf: 'center',
                    padding: 0,
                    margin: 0,

                    backgroundColor: '#E4EEE6',

                  }}>

                  <LinearGradient
                    colors={
                      noti.notificationMethodAction == 'MakePromiseRequest'
                        ? bgBtnrqstprms
                        : bgBtnmakeprms
                    }
                    style={DashBoardStyling.MainCard}>
                    <View
                      style={
                        {}
                      }>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                          style={{
                            width: wp(13),
                            height: hp(6),
                            borderRadius: wp(6.5), // Half of the width
                            marginLeft: wp(2),
                            marginTop: hp(1),
                          }}>
                          <Image
                            source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
                            style={{
                              width: wp(13),
                              height: hp(6),
                              borderRadius: wp(6.5), // Half of the width
                            }}
                          />
                        </View>
                        <View
                          style={{
                            marginLeft: wp(3),
                            width: wp(45),
                          }}>
                          <Text style={{ color: 'white', fontSize: hp(2) }}>
                            {selectitem.promiseeName}
                          </Text>
                        </View>
                        <View style={{ width: wp(8) }}>
                          <Entypo size={25} color="white" name="calendar" />
                        </View>

                        <View style={{ width: wp(15) }}>

                          <Text
                            style={[
                              Headings.Input6,
                              {
                                marginLeft: wp(0.1),
                                color: 'white',
                                marginTop: wp(0.3),
                              },
                            ]}>
                            {format(new Date(selectitem.expiryDate), 'dd/MM/yyyy')}
                          </Text>
                        </View>
                      </View>

                      <View style={DashBoardStyling.PromiseReward}>
                        {selectitem.guaranteedWithMoney ? (
                          <Text
                            style={[
                              {
                                color: 'white',
                                marginHorizontal: hp(2),
                                //  fontWeight: 'bold',
                                fontSize: hp(2),
                              },
                            ]}>
                            {notiMethod === 'Promise' ? (
                              <Text>Guarantee: </Text>
                            ) : (
                              <Text>Commitment: </Text>
                            )}
                            ${selectitem.paymentAmount}{' '}
                            {selectitem.alotRewardPoints ? (
                              <Text>
                                {' '}
                                & {selectitem.rewardPoints} Reward Points
                              </Text>
                            ) : null}
                          </Text>
                        ) : null}
                      </View>

                      {selectitem.ratingImpact ? (
                        <View>
                          <Text
                            style={[
                              {
                                color: 'white',
                                marginHorizontal: hp(2),
                                fontSize: hp(2),
                              },
                            ]}>
                            Rating will impact
                          </Text>
                        </View>
                      ) : null}

                      <View style={DashBoardStyling.PromiseGoal}>
                        <View>
                          <Text
                            style={[
                              {
                                color: 'white',
                                marginHorizontal: hp(2),
                                fontSize: hp(2),
                              },
                            ]}>
                            {selectitem.promiseGoal}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            // marginTop: hp(1),
                            width: wp(90),
                            // borderWidth: 1,

                          }}>
                          
                          {selectitem.actions.map((action, index) => {
                            if (action === 'Accept') {
                              return (
                                <TouchableOpacity
                                  style={commonStyles.ActionBtn}
                                  key={index}
                                  onPress={() => {
                                    const promiseId = noti.docNo;
                                    const userNoo = noti.userNo;
                                    const notiMethod = noti.notificationMethod;
                                    
                                    if (notiMethod == 'MakePromise') {
                                      handleAcceptPromise(promiseId, userN);
                                    } else {
                                      handleAccept(promiseId, userN);
                                    }
                                  }}>
                                  <Text style={{color:"white"}}>{action}</Text>
                                </TouchableOpacity>
                              );
                            } else if (action === 'Reject') {
                              return (
                                <TouchableOpacity
                                  style={[
                                    commonStyles.ActionBtn,
                                    { backgroundColor: 'red' },
                                  ]}
                                  key={index}
                                  onPress={() =>
                                    handleReject(selectitem.promiseID, userN)
                                  }>
                                  <Text style={{color:"white"}}>{action}</Text>
                                </TouchableOpacity>
                              );
                            } else if (action === 'Complete') {
                              return (
                                <TouchableOpacity
                                  style={[commonStyles.ActionBtn]}
                                  key={index}
                                  onPress={() =>
                                    handleCompletePromise(
                                      selectitem.promiseID,
                                      userN,
                                    )
                                  }>
                                  <Text style={{color:"white"}}>{action}</Text>
                                </TouchableOpacity>
                              );
                            } else if (action === 'Fail') {
                              return (
                                <TouchableOpacity
                                  style={[
                                    commonStyles.ActionBtn,
                                    { backgroundColor: 'red' },
                                  ]}
                                  key={index}
                                  onPress={() =>
                                    handleFailPromise(selectitem.promiseID, userN)
                                  }>
                                  <Text  style={{color:'white', fontWeight:'700'}}>{action}</Text>
                                </TouchableOpacity>
                              );
                            }
                          })}
                        </View> */}
                        <TouchableOpacity
                          onPress={() => {
                            setEditPReq(selectitem);
                            {
                              selectitem.promiseType == 'Payment'
                                ? (setrewardCheck(false),
                                  setpaymentCheck(true),
                                  setAmount(selectitem.paymentAmount))
                                : (setrewardCheck(true),
                                  setpaymentCheck(false),
                                  setPreward('+20XP'));
                            }
                            {
                              selectitem.isTimeBound
                                ? (setIsTimeB(true),
                                  setIsChecked2(true),
                                  setIsChecked1(false),
                                  setDeadLinedate(
                                    format(
                                      new Date(selectitem.expiryDate),
                                      'dd-MM-yyyy',
                                    ),
                                  ),
                                  setStartDate(
                                    format(
                                      new Date(selectitem.startDate),
                                      'dd-MM-yyyy',
                                    ),
                                  ))
                                : (setIsTimeB(false),
                                  setIsChecked2(false),
                                  setIsChecked1(true));
                            }
                            setSelectedReqPromiseID(selectitem.promiseID);
                            setGeneratedTexts(selectitem.promiseGoal);
                            setSelectedMedia(selectitem.promiseMediaURL);
                            setEditPromiseReq(true);

                            setSelectedPromisee({
                              networkUserName: selectitem.promiseeName,
                              networkUserNo: selectitem.promisee,
                              imageURL: selectitem.promiseeProfileImageUrl,
                            });
                            navigation.navigate('MakePromise');
                          }}
                          style={{ marginLeft: wp(2) }}>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(90),
    height: hp(40),
    flexDirection: 'row',
  },
  bar: {
    height: hp(3),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barText: {
    fontSize: hp(1.5),
    marginLeft: wp(1.5),
    marginRight: wp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
  },
  DataSection: {
    width: wp(48),
    height: hp(40),
    backgroundColor: '#DDDFE2',
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    borderTopWidth: wp(0.6),
    borderColor: '#652D90',
  },

  states: {
    width: wp(39),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(42),
    height: hp(21),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {},
  btn: {
    width: wp(20),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E4EEE6',
  },
});

import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {DashBoardStyling} from '../../Styling/DashBoard';
import {
  DetailsModalVi,
  NotificationData,
} from '../../recoil/Notifications/NotificationsStates';
import GetPromiseRequestById from '../../Network/Notifications/GetPromiseRequestbyID';
import GetPromiseById from '../../Network/Notifications/GetPromiseID';
import {useRecoilState} from 'recoil';
import {useIsFocused} from '@react-navigation/native';
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
import {Headings} from '../../Styling/Headings';
import {commonStyles} from '../../Styling/buttons';
import {
  handleAccept,
  handleReject,
} from '../Dashboard/ReqPromiseDashBoard/Action';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {
  handleAcceptPromise,
  handleCompletePromise,
  handleFailPromise,
} from '../Dashboard/Promise/PromiseAction';
import {ToastAndroid} from 'react-native';

const NotificationCard = () => {
  const navigation = useNavigation();
  const [promise, setPromise] = useState({});

  const [isModalV, setIsModalV] = useRecoilState(DetailsModalVi);
  const [noti, setNoti] = useRecoilState(NotificationData);

  const focus = useIsFocused();
  // const [isLoading, setIsLoading] = useState(false)

  // ===//

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
    console.log(urll);
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
    // console.log(noti.docNo)
    const docNo = noti.docNo;

    // const notiMethod = noti.notificationMethodAction;
    // const notiMethod = noti.notificationMethod;
    console.log(notiMethod);
    // setSelectitem(data);([]);
    if (notiMethod == 'Promise') {
      console.log('Fetching Promise');
      console.log(docNo);
      await GetPromiseById(docNo)
        .then(data => {
          if (data.code === 200) {
            setSelectitem(data.promisesList[0]);
            console.log(data);
            console.log(selectitem, 'mmmc');
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
          // console.error('Error fetching promise:', error);
        });
    } else if (notiMethod == 'RequestPromise') {
      console.log('Fetching Promise by Request', docNo);

      await GetPromiseRequestById(docNo)
        .then(data => {
          if (data.code === 200) {
            setSelectitem(data.promiseRequestList[0]);
            console.log(data);
            console.log(selectitem, 'PromiseRequestData');
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

          // setSelectitem(data[0]);
          // console.log(data, 'Test By AB');
          // setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching promise:', error);
        });
    } else {
      console.log('Non of them');
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
    // }, [focus, selectitem]);
  }, [focus]);

  return (
    <>
      <View style={{height: hp(35)}}>
        <BlurView
          style={{flex: 1}}
          blurType="light" // You can customize the blurType as needed
          blurAmount={10} // You can adjust the blurAmount as needed
        ></BlurView>
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
                height: hp(38),
                width: wp(90),
                alignSelf: 'center',
                backgroundColor: 'white',
                // marginTop: hp(35),
                backgroundColor: '#E4EEE6',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,

                elevation: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalV(false), setSelectitem({});
                }}
                style={{position: 'absolute', right: wp(4), top: hp(1)}}>
                <Font color="#652D90" name="close" size={30} />
              </TouchableOpacity>
              <LinearGradient
                colors={
                  noti.notificationMethodAction == 'MakePromiseRequest'
                    ? bgBtnrqstprms
                    : bgBtnmakeprms
                }
                style={DashBoardStyling.MainCard}>
                <View
                  style={
                    {
                      // width: wp(90),
                      // height: hp(23),
                      // alignItems: 'center',
                      // borderWidth:1
                    }
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: wp(13),
                        height: hp(6),
                        borderRadius: wp(6.5), // Half of the width
                        marginLeft: wp(2),
                        marginTop: hp(1),
                      }}>
                      <Image
                        source={
                          selectitem.promiseeProfileImageUrl === ''
                            ? {
                                uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                              }
                            : {uri: selectitem.promiseeProfileImageUrl}
                        }
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
                      <Text style={{color: 'white', fontSize: hp(2)}}>
                        {selectitem.promiseeName}
                      </Text>
                    </View>
                    <View style={{width: wp(8)}}>
                      <Entypo size={25} color="white" name="calendar" />
                    </View>

                    <View style={{width: wp(15)}}>
                      {/* <Text
                      style={[
                        Headings.Input5,
                        {
                          marginLeft: wp(0.1),
                          color: 'white',
                          marginTop: wp(0.3),
                        },
                      ]}>
                      DeadLine
                    </Text> */}
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
                  {selectitem.promiseMediaURL ? (
                    <TouchableOpacity
                      onPress={() =>
                        handelAttachedMedia(selectitem.promiseMediaURL)
                      }>
                      <Text style={{color: 'blue'}}>Attached File</Text>
                    </TouchableOpacity>
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
                  {/* <View style={DashBoardStyling.PromiseReward}>
                  {selectitem.promiseType == 'Payment' ? (
                    <Text
                      style={[
                        {
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: hp(2.3),
                        },
                      ]}>
                      Amount:$ {selectitem.paymentAmount}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        {
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: hp(2.3),
                        },
                      ]}>
                      Reward: +20XP
                    </Text>
                  )}
                  {selectitem.promiseMediaURL ? (
                    <TouchableOpacity
                      onPress={() =>
                        handelAttachedMedia(selectitem.promiseMediaURL)
                      }>
                      <Text style={{color: 'blue'}}>Attached File</Text>
                    </TouchableOpacity>
                  ) : null}
                </View> */}
                  {/* <View style={DashBoardStyling.PromiseGoal}>
                    <View>
                      <Text style={[Headings.Input5, {color: 'white', }]}>
                        {selectitem.promiseGoal}
                      </Text>
                    </View>
                  </View> */}
                  <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        // marginTop: hp(1),
                        width: wp(90),
                        // borderWidth: 1,
                        
                      }}>
                      {/* <TouchableOpacity style={styles.btn}>
                         {selectitem.status=="Pending"?
                         <Text>Accept</Text>:
                         <Text>Mark Completed</Text> }
                         </TouchableOpacity>
                         <TouchableOpacity style={[styles.btn, {backgroundColor:'#E32E2E'}]}>
                         {selectitem.status=="Pending"?
                         <Text>Reject</Text>:
                         <Text>Mark Failed</Text>}
                         </TouchableOpacity> */}
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
                                // handleAccept(selectitem.promiseID, userN),
                                // console.log(promiseId, userN, "Test")
                                if (notiMethod == 'MakePromise') {
                                  handleAcceptPromise(promiseId, userN);
                                } else {
                                  handleAccept(promiseId, userN);
                                }
                              }}>
                              <Text>{action}</Text>
                            </TouchableOpacity>
                          );
                        } else if (action === 'Reject') {
                          return (
                            <TouchableOpacity
                              style={[
                                commonStyles.ActionBtn,
                                {backgroundColor: 'red'},
                              ]}
                              key={index}
                              onPress={() =>
                                handleReject(selectitem.promiseID, userN)
                              }>
                              <Text>{action}</Text>
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
                              <Text>{action}</Text>
                            </TouchableOpacity>
                          );
                        } else if (action === 'Fail') {
                          return (
                            <TouchableOpacity
                              style={[
                                commonStyles.ActionBtn,
                                {backgroundColor: 'red'},
                              ]}
                              key={index}
                              onPress={() =>
                                handleFailPromise(selectitem.promiseID, userN)
                              }>
                              <Text>{action}</Text>
                            </TouchableOpacity>
                          );
                        }
                      })}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setEditPReq(selectitem);
                        console.log('Hiiii', selectitem);
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
                        // setSelectedPromisee.networkUserNo(selectitem.promisee)
                        // setSelectedPromisee.networkUserName(selectitem.promiseeName)
                        setSelectedPromisee({
                          networkUserName: selectitem.promiseeName,
                          networkUserNo: selectitem.promisee,
                          imageURL: selectitem.promiseeProfileImageUrl,
                        });
                        console.log(Promiseze);
                        navigation.navigate('MakePromise');
                        // setAmount(item.)
                      }}
                      style={{marginLeft: wp(2)}}>
                      {/* <Feather color="white" name="edit-2" size={17} /> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}
      </View>
      <BlurView
        style={{flex: 1}}
        blurType="light" // You can customize the blurType as needed
        blurAmount={10} // You can adjust the blurAmount as needed
      ></BlurView>
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
    // borderWidth: wp(0.3),
    height: hp(40),
    // borderRadius: wp(4),
    backgroundColor: '#DDDFE2',
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    borderTopWidth: wp(0.6),
    borderColor: '#652D90',
  },

  states: {
    width: wp(39),
    // borderWidth: wp(0.3),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(42),
    // borderWidth: wp(0.3),
    height: hp(21),
    // borderColor: 'red',
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {},
  btn: {
    // width: wp(35),
    width: wp(20),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

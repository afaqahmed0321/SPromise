import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DashBoardStyling } from '../../Styling/DashBoard';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { Headings } from '../../Styling/Headings';
import { format } from 'date-fns';
import {
  handleAcceptPromise,
  handleCompletePromise,
  handleFailPromise,
  handleFailedPromiseApi,
  handleFulfilledPromiseApi,
  handleRejectPromise,
} from '../Dashboard/Promise/PromiseAction';
import { commonStyles } from '../../Styling/buttons';
import {
  handleAccept,
} from '../Dashboard/ReqPromiseDashBoard/Action';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import PaymentScreens from '../../screens/PaymentScreens';
import { selectedVideoR } from '../../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DetailCard = ({
  promisorName,
  promiseeProfileImageUrl,
  promisetype,
  amount,
  promiseeName,
  date,
  name,
  promiseMediaURL,
  ratingImpact,
  promiseGoal,
  actions,
  promiseID,
  userN,
  tab,
  guaranteedWithMoney,
  alotRewardPoints,
  rewardPoints,
  refreshCallback,
  style,
  navigation,
  jugaar
}) => {
  const [isPaymentWebViewVisible, setIsPaymentWebViewVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [forName, setForName] = useState(false);
  const [actionState, setActionState] = useState(true);


  console.log(promiseeProfileImageUrl,
    promisetype,
    amount,
    promiseeName,
    promisorName,
    date,
    name,
    promiseMediaURL,
    ratingImpact,
    promiseGoal,
    "actionsssss",
    actions,
    promiseID,
    userN,
    tab,
    guaranteedWithMoney,
    alotRewardPoints,
    rewardPoints,
    refreshCallback,
    style,
    navigation,
    jugaar,
    "all dataaaaaa"
  )


  const handelAttachedMedia = (urll) => {
    console.log(urll, "video playing");
    setSelectedVideo(urll);
    toggleVideoModal();
  };

  const toggleVideoModal = () => {
    setIsVideoModalVisible(!isVideoModalVisible);
  };

  const VideoModal = ({ isVisible, toggleModal, videoUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    const handleLoad = () => {
      setIsLoading(false);
    };



    useEffect(() => {
      // DetailCard();
    }, [actionState]);



    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={isVideoModalVisible}
        onRequestClose={toggleVideoModal}
      >
        <TouchableWithoutFeedback>
          <View style={styles.overlay}>
            <View style={{ height: hp(35) }}>
              <BlurView blurType="light" blurAmount={10} style={{ flex: 1 }}></BlurView>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
              {isLoading && <ActivityIndicator size="large" color="white" />}
              <Video
                source={{ uri: selectedVideo }}
                style={{ width: '100%', height: 240, display: isLoading ? 'none' : 'flex' }}
                controls={true}
                resizeMode="contain"
                onLoadStart={handleLoadStart}
                onLoad={handleLoad}
              />
              <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={toggleVideoModal}>
                <Text style={{ color: 'white', fontSize: 18 }}>X</Text>
              </TouchableOpacity>
            </View>
            <BlurView blurType="light" blurAmount={10} style={{ flex: 1 }}>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    );
  };
  const handleCloseModal = () => {
    setIsPaymentWebViewVisible(!isPaymentWebViewVisible);
    setActionState(!actionState);
  };

  return (
    <>
      {console.log("actionsss",
        promiseeProfileImageUrl,
        promisetype,
        amount,
        promiseeName,
        promisorName,
        date,
        name,
        promiseMediaURL,
        ratingImpact,
        promiseGoal,
        "this is Actionssssssssssssssss",
        actions,
        promiseID,
        "this is userNumber",
        userN,
        tab,
        guaranteedWithMoney,
        alotRewardPoints,
        rewardPoints,
        refreshCallback,
        style,
        navigation,
        jugaar)}

      {tab == 'UserPromiseReq' || tab == 'ReqPromiseDashboard' ? (
        <LinearGradient
          colors={
            tab == 'UserPromiseReq'
              ? ['#E4A936', '#EE8347']
              : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MainCard}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: wp(12),
                  height: hp(6),
                  borderRadius: wp(6),
                  marginLeft: wp(2),
                  marginTop: hp(1),
                }}>
                <Image
                  source={
                    promiseeProfileImageUrl === ''
                      ? {
                        uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                      }
                      : { uri: promiseeProfileImageUrl }
                  }
                  style={{
                    width: wp(12),
                    height: hp(6),
                    borderRadius: wp(6),
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(3),
                  width: wp(45),
                }}>
                <Text style={{ color: '#fff', fontSize: hp(2) }}>{actions == 'Pay' ? promiseeName : promisorName ? promisorName : name}</Text>
              </View>
              <View style={{ width: wp(8) }}>
                <Entypo size={20} color="white" name="calendar" />
              </View>

              <View>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0.7),
                      color: 'white',
                      marginTop: wp(0.3),
                    },
                  ]}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </Text>
              </View>
            </View>
            <View style={DashBoardStyling.PromiseReward}>
              {guaranteedWithMoney ? (
                <Text
                  style={[
                    {
                      color: 'black',
                      marginHorizontal: hp(4),
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 10
                    },
                  ]}>
                  ${amount} {alotRewardPoints ? (
                    <Text style={[
                      {
                        color: 'black',
                        marginHorizontal: hp(4),
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginHorizontal: 10

                      },
                    ]}> & {rewardPoints}pts </Text>
                  ) : null}
                </Text>
              ) : null}
            </View>
            {ratingImpact ? (
              <View>
                {/* <FontAw5 color="#652D90" name="medal" size={23} style={{ marginHorizontal: hp(2) }} /> */}
                <MaterialIcons
                  name="stars"
                  size={25}
                  color='#652D90'
                  style={{ marginLeft: 10 }}

                />
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <FontAw5 color="#652D90" name="youtube" size={23} style={{ marginHorizontal: hp(2) }} />
                <VideoModal />
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
                  {promiseGoal}
                </Text>
              </View>
            </View>

            <View style={DashBoardStyling.PromiseGoal}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <>
                      <Text style={{ color: "white", paddingLeft: 13 }}>You can either accept or reject this promise</Text>
                    </>
                  );
                } else if (action === 'Fulfilled') {
                  return (
                    <>
                      <Text style={{ color: "white", paddingLeft: 13 }}>You can either Fulfill or Fail this promise</Text>
                    </>
                  );
                } else if (action === 'Pay') {
                  return (
                    <>
                      <Text style={{ color: "white", paddingLeft: 13 }}>Pay the amount to complete this promise</Text>
                    </>
                  );
                } else if (action === 'Complete') {
                  return (
                    <>
                      <Text style={{ color: "white", paddingLeft: 13 }}>You can either accept or reject this promise</Text>
                    </>
                  );
                }
              })}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',

                marginTop: hp(1),
                width: wp(90),
              }}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        handleAccept(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Reject') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleRejectPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Complete') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleCompletePromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Fail') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleFailPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
                else if (action === 'Fulfilled') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleFulfilledPromiseApi(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Failed') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleFailedPromiseApi(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
                else if (action == 'Pay') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        setIsPaymentWebViewVisible(true);
                      }}>
                      <Text style={{ color: "white" }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        </LinearGradient>
      ) : tab == 'PromisestoMe' || tab == 'Promise' ? (
        <LinearGradient
          colors={
            tab == 'PromisestoMe'
              ? ['#73B6BF', '#2E888C']
              : ['#E4A936', '#EE8347']
          }
          style={DashBoardStyling.MainCard}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5),
                  marginLeft: wp(2),
                  marginTop: hp(1),
                }}>
                <Image
                  source={
                    promiseeProfileImageUrl === ''
                      ? {
                        uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                      }
                      : { uri: promiseeProfileImageUrl }
                  }
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5),
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(3),
                  width: wp(45),
                }}>
                <Text style={{ color: 'white', fontSize: hp(2) }}>{actions === 'Pay' ? promiseeName : promisorName ? promisorName : name}</Text>
              </View>
              <View style={{ width: wp(8) }}>
                <Entypo size={25} color="white" name="calendar" />
              </View>

              <View>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0),
                      color: 'white',
                      marginTop: wp(0.3),
                    },
                  ]}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </Text>
              </View>
            </View>
            <View style={DashBoardStyling.PromiseReward}>

              {promisetype == 'GUARANTEE' ? (
                <>
                  {amount ? (
                    <>
                      <Text
                        style={[
                          {
                            color: 'black',
                            marginHorizontal: hp(4),
                            fontSize: hp(1.8),
                            backgroundColor: "#e0e0e0",
                            borderRadius: 50,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 10

                          },
                        ]}>
                        <>
                          $ {amount}
                          {rewardPoints ? (
                            <Text style={[
                              {
                                color: 'black',
                                marginHorizontal: hp(4),
                                fontSize: hp(1.8),
                                backgroundColor: "#e0e0e0",
                                borderRadius: 50,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                marginHorizontal: 10

                              },
                            ]}>  {rewardPoints}pts
                            </Text>
                          ) : null}
                        </>
                      </Text>
                    </>
                  ) : (
                    null
                  )}
                </>

              ) : promisetype == 'COMMITMENT' ? (
                <Text
                  style={[
                    {
                      color: 'black',
                      marginHorizontal: hp(4),
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 10

                    },
                  ]}>
                  {amount > 0 && (
                    <>
                      $ {amount}
                      {rewardPoints ? (
                        <Text style={[
                          {
                            color: 'black',
                            marginHorizontal: hp(4),
                            fontSize: hp(1.8),
                            backgroundColor: "#e0e0e0",
                            borderRadius: 50,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 10

                          },
                        ]}> & {rewardPoints}pts </Text>
                      ) : <Text style={[
                        {
                          color: 'black',
                          marginHorizontal: hp(4),
                          fontSize: hp(1.8),
                          backgroundColor: "#e0e0e0",
                          borderRadius: 50,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginHorizontal: 10

                        },
                      ]}> & {rewardPoints}pts </Text>}
                    </>
                  )}


                  {actions.map((action, index) => {
                    {
                      <View style={DashBoardStyling.PromiseGoal}>
                        {actions.map((action, index) => {
                          if (action === 'Accept') {
                            return (
                              <>
                                <Text style={{ color: "white", paddingLeft: 13 }}>You can either accept or reject this promise</Text>
                              </>
                            );
                          } else if (action === 'Fulfilled') {
                            return (
                              <>
                                <Text style={{ color: "white", paddingLeft: 13 }}>You can either Fulfill or Fail this promise</Text>
                              </>
                            );
                          } else if (action === 'Pay') {
                            return (
                              <>
                                <Text style={{ color: "white", paddingLeft: 13 }}>Pay the amount to complete this promise</Text>
                              </>
                            );
                          } else if (action === 'Complete') {
                            return (
                              <>
                                <Text style={{ color: "white", paddingLeft: 13 }}>You can either accept or reject this promise</Text>
                              </>
                            );
                          }
                        })}
                      </View>

                      if (action === 'Accept') {
                        return (
                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={() => {
                              handleAcceptPromise(promiseID, userN);
                              refreshCallback();
                              setActionState(!actionState);
                            }}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        );
                      } else if (action === 'Reject') {
                        return (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              handleRejectPromise(promiseID, userN);
                              refreshCallback();
                              setActionState(!actionState);
                            }}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }
                  })}


                </Text>
              ) : null}
            </View>

            {ratingImpact ? (
              <View>
                {/* <FontAw5 color="#652D90" name="medal" size={23} style={{ marginHorizontal: hp(2) }} /> */}
                <MaterialIcons
                  name="stars"
                  size={25}
                  color='#652D90'
                  style={{ marginLeft: 10 }}
                />
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <FontAw5 color="#652D90" name="youtube" size={23} style={{ marginHorizontal: hp(2) }} />
                <VideoModal />
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
                  {promiseGoal}
                </Text>
              </View>
            </View>

            <View style={DashBoardStyling.PromiseGoal}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either accept or reject this promise</Text>
                    </>
                  );
                } else if(action === 'Fulfilled'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either Fulfill or Fail this promise</Text>
                    </>
                  );
                } else if (action === 'Pay'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>Pay the amount to complete this promise</Text>
                    </>
                  );
                } else if(action === 'Complete'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either accept or reject this promise</Text>
                    </>
                  );
                }
              })}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp(0.5),
                width: wp(90),
              }}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        handleAcceptPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Reject') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleRejectPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Complete') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleCompletePromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Fail') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleFailPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
                else if (action === 'Fulfilled') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleFulfilledPromiseApi(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Failed') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleFailedPromiseApi(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
                else if (action == 'Pay') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        setIsPaymentWebViewVisible(true);
                      }}>
                      <Text style={{ color: "white" }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        </LinearGradient>
      ) : tab == 'Home' ? (
        <LinearGradient
          colors={
            tab == 'PromisestoMe' || actions == 'Pay'
              ? ['#E4A936', '#EE8347']
              : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MainCardHome}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5),
                  marginLeft: wp(7),
                  marginTop: hp(1),
                }}>
                <Image
                  source={
                    promiseeProfileImageUrl === ''
                      ? {
                        uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                      }
                      : { uri: promiseeProfileImageUrl }
                  }
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5),
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(-3),
                  width: wp(45),
                }}>
                <Text style={{ color: 'white', fontSize: hp(2), marginLeft: 15 }}>{actions == 'Pay' ? promiseeName : promisorName ? promisorName : name}</Text>
              </View>
              <View style={{ width: wp(8) }}>
                <Entypo size={20} color="white" name="calendar" />
              </View>

              <View>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0.7),
                      color: 'white',
                      marginTop: wp(0.3),
                    },
                  ]}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </Text>
              </View>
            </View>
            <View style={DashBoardStyling.PromiseReward}>
              {promisetype == 'GUARANTEE' ? (
                <Text
                  style={[
                    {
                      color: 'black',
                      marginHorizontal: hp(4),
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 25

                    },
                  ]}>
                  {/* Guarantee: */}
                  $ {amount}
                  {rewardPoints ? (
                    <Text style={[
                      {
                        color: 'black',
                        marginHorizontal: hp(4),
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginHorizontal: 10

                      },
                    ]}> & {rewardPoints}pts
                      {/* Reward Points */}
                    </Text>
                  ) : null}
                </Text>
              ) : promisetype == 'COMMITMENT' ? (
                <Text
                  style={[
                    {
                      color: 'black',
                      marginHorizontal: hp(4),
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 25

                    },
                  ]}>
                  ${amount} {''}
                  {rewardPoints ? (
                    <Text style={[
                      {
                        color: 'black',
                        marginHorizontal: hp(4),
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginHorizontal: 20

                      },
                    ]}>
                      & {rewardPoints}pts
                    </Text>
                  ) : null}
                </Text>
              ) : null}
            </View>

            {ratingImpact ? (
              <View>
                {/* <FontAw5 color="#652D90" name="medal" size={23} style={{ marginHorizontal: hp(4) }} /> */}
                <MaterialIcons
                  name="stars"
                  size={25}
                  color='#652D90'
                  style={{ marginLeft: 30 }}

                />
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <FontAw5 color="#652D90" name="youtube" size={23} style={{ marginHorizontal: hp(4) }} />
                <VideoModal />
              </TouchableOpacity>

            ) : null}
            <View style={DashBoardStyling.PromiseGoal}>
              <View>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(4),
                      fontSize: hp(2),
                    },
                  ]}>
                  {promiseGoal}
                </Text>
              </View>
            </View>

            <View style={DashBoardStyling.PromiseGoal}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either accept or reject this promise</Text>
                    </>
                  );
                } else if(action === 'Fulfilled'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either Fulfill or Fail this promise</Text>
                    </>
                  );
                } else if (action === 'Pay'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>Pay the amount to complete this promise</Text>
                    </>
                  );
                } else if(action === 'Complete'){
                  return (
                    <>
                      <Text style={{color:"white", paddingLeft: 13}}>You can either accept or reject this promise</Text>
                    </>
                  );
                }
              })}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp(0.5),
                width: wp(90),
              }}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        handleAcceptPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Reject') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleRejectPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Complete') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleCompletePromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Fail') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                      key={index}
                      onPress={() => {
                        handleFailPromise(promiseID, userN);
                        refreshCallback();
                        setActionState(!actionState);
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action == 'Pay') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        setIsPaymentWebViewVisible(true);
                      }}>
                      <Text style={{ color: "white" }}>{action}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        </LinearGradient>
      ) : null}

      <Modal
        animationType="slide"
        visible={isPaymentWebViewVisible}
        onRequestClose={isPaymentWebViewVisible}>
        <SafeAreaView style={{ height: '100%', width: wp(100) }}>
          <TouchableOpacity
            onPress={() => setIsPaymentWebViewVisible(false)}
            style={{
              marginLeft: wp(2),
              height: hp(5),
              marginTop: hp(1),
            }}>
            <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />
          </TouchableOpacity>
          <PaymentScreens promiseID={promiseID} userN={userN} amount={amount} handleCloseModal={handleCloseModal} />
        </SafeAreaView>
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  left: {
    width: wp(33),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    height: hp(5),
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  right: {
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    height: hp(5)
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 0, 0, 0.5)',
  },
});
export default DetailCard;

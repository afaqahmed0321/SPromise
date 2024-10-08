import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
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
  handleReject,
} from '../Dashboard/ReqPromiseDashBoard/Action';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import PaymentScreens from '../../screens/PaymentScreens';
import { pay, payVisible, selectedVideoR } from '../../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DetailCard = ({
  promisorName,
  promiseeProfileImageUrl,
  promisorImageUrl,
  promisetype,
  promisor,
  amount,
  isTimeBound,
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
  // navigation,
  jugaar,
  displayStatus,
  status
}) => {
  const [isPaymentWebViewVisible, setIsPaymentWebViewVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [payButton, setPayButton] = useRecoilState(pay);
  const [hidePayButton, setHidePayButton] = useRecoilState(payVisible);


  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [forName, setForName] = useState(false);
  const [actionState, setActionState] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [blank, setBlank] = useState(false);
  const navigation = useNavigation();

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const handleCompletePromiseWithModal = (promiseID, userN) => {
    // Additional logic to handle complete promise with modal
    setIsModalVisible(true);
  };

  const handleTextareaChange = (text) => {
    setTextareaValue(text);
  };

  const handleCompleteAction = async () => {


    setIsLoading1(true);
    handleCompletePromise(promiseID, userN, textareaValue)
      .then((res) => {
        console.log("response in details card", res);
        if (res.code == 100) {
          setBlank(true);
          refreshCallback();
          setActionState(!actionState);
          setIsLoading1(false);
        } else {
          setBlank(false);
        }
      });

    refreshCallback();
    setActionState(!actionState);
    setIsModalVisible(false); // Close the modal after completing
  };

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
    // navigation,
    jugaar,
    "all dataaaaaa"
  )


  const handelAttachedMedia = (urll) => {
    setSelectedVideo(urll);
    toggleVideoModal();
  };

  const toggleVideoModal = () => {
    setIsVideoModalVisible(!isVideoModalVisible);
  };

  const VideoModal = ({ isVisible, toggleModal, videoUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleLoadStart = () => {
      console.log(selectedVideo)
      setIsLoading(true);
    };
    const handleLoad = () => {
      setIsLoading(false);
    };



    useEffect(() => {
      setHidePayButton(false);
      const timer = setTimeout(() => {
        setPayButton(true);
      }, 3000);

      return () => clearTimeout(timer);
    });



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
                <Text style={{ color: 'white', fontSize: wp(4) }}>X</Text>
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
  function payFalse(a) {
    setPayButton(a);
  }

  const navi = () => {
    console.log("payyyyyyyyyyyyy", promiseID, userN, amount)
    payFalse(false);
    navigation?.navigate('PaymentScreens', { promiseID, userN, amount, payFalse })
  }

  useEffect(() => {
    setHidePayButton(false);

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        console.log('Keyboard is visible');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        console.log('done');
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <>
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
                  source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
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
                <Text style={{ color: '#fff', fontSize: hp(2) }}>{actions == 'Pay' ? promisorName : name}</Text>
              </View>
              {isTimeBound ? (
                <>

                  <View style={{ width: wp(5) }}>
                    <Entypo size={20} color="white" name="calendar" />
                  </View>

                  <View>
                    <Text
                      style={[
                        Headings.Input6,
                        {
                          marginLeft: wp(0.1),
                          color: 'white',
                          marginTop: wp(0.3),
                        },
                      ]}>
                      {format(new Date(date), 'MM/dd/yyyy')}
                    </Text>
                  </View>
                </>
              ) : (
                null
              )}

            </View>
            <View style={{ marginBottom: hp(1) }}>
              <Text style={styles.promisingText}>
                {promiseeName} is promising to {promisorName}
              </Text>
            </View>
            <View style={[DashBoardStyling.PromiseReward, { marginBottom: hp(1) }]}>
              {guaranteedWithMoney ? (
                <Text style={styles.baseText}>
                  ${amount}
                  {alotRewardPoints ? (
                    <Text style={styles.baseText}> & {rewardPoints} pts </Text>
                  ) : null}
                </Text>
              ) : null}
            </View>
            {ratingImpact ? (
              <View style={{ marginBottom: hp(1) }}>
                <Text style={styles.dynamicText}>
                  Rating Will Impact
                </Text>
              </View>
            ) : null}

            {displayStatus ? (
              <View style={{ marginBottom: hp(1) }}>
                <Text style={styles.statusText}>
                  Promise {displayStatus}
                </Text>
              </View>
            ) : null}



            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <View style={styles.thumbnailContainer}>
                  <Video
                    source={{ uri: promiseMediaURL }}
                    style={styles.videoThumbnail}
                    paused={true} // Make sure the video is paused initially
                    resizeMode="cover"
                    controls={false}
                  />
                </View>
                <VideoModal
                  isVisible={isVideoModalVisible}
                  toggleModal={toggleVideoModal}
                  videoUrl={selectedVideo}
                />
              </TouchableOpacity>
            ) : null}

            <View style={[styles.promiseGoalContainer, { marginBottom: hp(1) }]}>
              <View>
                <Text style={styles.promiseGoalText}>
                  {showFullText ? promiseGoal : `${promiseGoal.slice(0, 90)}`}
                </Text>
                {promiseGoal.length > 90 && (
                  <TouchableOpacity onPress={toggleText}>
                    <Text style={{
                      color: 'white', fontWeight: 'bold', fontSize: hp(1.6), marginHorizontal: hp(0),
                      paddingHorizontal: hp(0.2), textDecorationLine: "underline", margin: 0
                    }}>
                      {showFullText ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.actionTextContainer}>
              {isLoading1 ? (
                <></>
              ) : (
                actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <View key={index}>
                          <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                        </View>
                      )
                    );
                  } else if (action === 'Fulfilled') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <View key={index}>
                          <Text style={styles.actionText}>Promisor has met the terms of the Promise, you can now fulfill or fail the resolution.</Text>
                        </View>
                      )
                    );
                  } else if (action === 'Pay') {
                    return (
                      payButton && (
                        <View key={index}>
                          <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                        </View>
                      )
                    );
                  } else if (action === 'Complete') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <View key={index}>
                          <Text style={styles.actionText}>You can either complete or fail this promise</Text>
                        </View>
                      )
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',

                marginTop: hp(1),
                width: wp(90),
              }}>
              {isLoading1 ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={commonStyles.ActionBtn}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleAccept(promiseID, userN, navigation)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling accept promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  } else if (action === 'Reject') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleReject(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling reject promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  } else if (action === 'Complete') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn]}
                          key={index}
                          onPress={() => {
                            // handleCompletePromise(promiseID, userN);

                            refreshCallback();
                            setActionState(!actionState);
                          }}>
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )
                    );
                  } else if (action === 'Fail') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            handleFailPromise(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling fail promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )
                    );
                  }
                  else if (action === 'Fulfilled') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleFulfilledPromiseApi(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling fulfilled promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  } else if (action === 'Failed') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleFailedPromiseApi(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling failed promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  }
                  else if (action == 'Pay') {
                    return (
                      hidePayButton ? (
                        <></>
                      ) : (

                        <TouchableOpacity
                          style={commonStyles.ActionBtn}
                          key={index}
                          onPress={navi}>
                          <Text style={{ color: "white" }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  }
                })
              )}
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
          {console.log("detail crad data", amount, rewardPoints)}
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
                  source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
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
                <Text style={{ color: 'white', fontSize: hp(2) }}>{actions === 'Pay' ? promiseeName : name}</Text>
              </View>
              {isTimeBound ? (
                <>

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
                      {format(new Date(date), 'MM/dd/yyyy')}
                    </Text>
                  </View>
                </>
              ) : (
                null
              )}


            </View>
            <View style={{ marginBottom: hp(1) }}>
              <Text style={styles.promisingTextGaurantee}>
                {promisorName} is promising to {promiseeName}
              </Text>
            </View>

            {(amount > 0 || rewardPoints > 0) && (

              <View style={[styles.amountRewardText, { marginBottom: hp(1) }]}>

                {promisetype == 'GUARANTEE' ? (
                  <>
                    {amount ? (
                      <>
                        <Text
                          style={[
                            {
                              color: 'black',
                              fontSize: hp(1.8),
                              backgroundColor: "#e0e0e0",
                              borderRadius: 50,
                              paddingVertical: 5,
                              paddingHorizontal: 10,
                              alignSelf: 'flex-start', // Ensures the width adjusts according to the content
                            },
                          ]}>
                          <>
                            ${amount}
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
                              ]}>  {rewardPoints} pts
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
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        alignSelf: 'flex-start', // Ensures the width adjusts according to the content
                      },
                    ]}>
                    {amount > 0 && (
                      <>
                        ${amount}
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
                              marginHorizontal: 10,
                            },
                          ]}> & {rewardPoints} pts </Text>
                        ) : <Text style={[
                          {
                            color: 'black',
                            marginHorizontal: hp(4),
                            fontSize: hp(1.8),
                            backgroundColor: "#e0e0e0",
                            borderRadius: 50,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 10,
                          },
                        ]}> & {rewardPoints} pts </Text>}
                      </>
                    )}


                    {isLoading1 ? (
                      <></>
                    ) : (
                      actions.map((action, index) => {
                        {
                          <View style={DashBoardStyling.PromiseGoal}>
                            {actions.map((action, index) => {
                              if (action === 'Accept') {
                                return (
                                  blank ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Text style={{ color: "white", paddingLeft: 13 }}>You can either accept or reject this promise</Text>
                                    </>
                                  )
                                );
                              } else if (action === 'Fulfilled') {
                                return (
                                  blank ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Text style={{ color: "white", paddingLeft: 13 }}>Promisor has met the terms of the Promise, you can now fulfill or fail the resolution.</Text>
                                    </>
                                  )
                                );
                              } else if (action === 'Pay') {
                                return (
                                  payButton && (
                                    <>
                                      <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                                    </>
                                  )
                                );
                              } else if (action === 'Complete') {
                                return (
                                  blank ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Text style={{ color: "white", paddingLeft: 13 }}>You can either complete or fail this promise</Text>
                                    </>
                                  )
                                );
                              }
                            })}
                          </View>

                          if (action === 'Accept') {
                            return (
                              blank ? (
                                <></>
                              ) : (
                                <TouchableOpacity
                                  style={commonStyles.ActionBtn}
                                  key={index}
                                  onPress={() => {
                                    setIsLoading1(true);
                                    setBlank(true);
                                    const res = handleAcceptPromise(promiseID, userN);
                                    if (res === 1) {
                                      setIsLoading1(false);
                                    } else {
                                      setBlank(false);
                                    }
                                    refreshCallback();
                                    setActionState(!actionState);
                                  }}>
                                  <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                                </TouchableOpacity>
                              )
                            );
                          } else if (action === 'Reject') {
                            return (
                              blank ? (
                                <></>
                              ) : (
                                <TouchableOpacity
                                  style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                                  key={index}
                                  onPress={() => {
                                    setIsLoading1(true);
                                    setBlank(true);
                                    const res = handleRejectPromise(promiseID, userN);
                                    if (res === 1) {
                                      setIsLoading1(false);
                                    } else {
                                      setBlank(false);
                                    }
                                    refreshCallback();
                                    setActionState(!actionState);
                                  }}>
                                  <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                                </TouchableOpacity>
                              )
                            );
                          }
                        }
                      })
                    )
                    }


                  </Text>
                ) : null}

              </View>
            )}

            {ratingImpact ? (
              <View style={{ marginBottom: hp(1) }}>
                <Text style={styles.dynamicText}>
                  Rating Will Impact
                </Text>
              </View>
            ) : null}

            {displayStatus ? (
              <View style={{ marginBottom: hp(1), marginHorizontal: hp(1.2), }}>
                <Text style={styles.statusText}>
                  Promise {displayStatus}
                </Text>
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <View style={styles.thumbnailContainer}>
                  <Video
                    source={{ uri: promiseMediaURL }}
                    style={styles.videoThumbnail}
                    paused={true} // Make sure the video is paused initially
                    resizeMode="cover"
                    controls={false}
                  />
                </View>
                <VideoModal
                  isVisible={isVideoModalVisible}
                  toggleModal={toggleVideoModal}
                  videoUrl={selectedVideo}
                />
              </TouchableOpacity>
            ) : null}
            <View style={[styles.promiseGoalContainer, { marginBottom: hp(1) }]}>
              <View>
                <Text style={styles.promiseGoalText}>
                  {showFullText ? promiseGoal : `${promiseGoal.slice(0, 90)}`}
                </Text>
                {promiseGoal.length > 90 && (
                  <TouchableOpacity onPress={toggleText}>
                    <Text style={{
                      color: 'white', fontWeight: 'bold', fontSize: hp(1.6), marginHorizontal: hp(0),
                      paddingHorizontal: hp(0.2), textDecorationLine: "underline", margin: 0
                    }}>
                      {showFullText ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.actionTextContainer}>
              {isLoading1 ? (
                <></>
              ) : (
                actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <>
                          <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                        </>
                      )
                    );
                  } else if (action === 'Fulfilled') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <>
                          <Text style={styles.actionText}>Promisor has met the terms of the Promise, you can now accept or reject the resolution.</Text>
                        </>
                      )
                    );
                  } else if (action === 'Pay') {
                    return (
                      payButton && (
                        <>
                          <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                        </>
                      )
                    );
                  } else if (action === 'Complete') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <>
                          <Text style={styles.actionText}>You can either complete or fail this promise</Text>
                        </>
                      )
                    );
                  }
                })
              )
              }
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp(0.5),
                width: wp(90),
              }}>
              {isLoading1 ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={commonStyles.ActionBtn}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleAcceptPromise(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              });
                          }}>
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )
                    );
                  } else if (action === 'Reject') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleRejectPromise(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code === 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error('Error:', error.message);
                                setIsLoading1(false); // Stop loading even if there's an error
                              });
                          }}>
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  } else if (action === 'Complete') {
                    // return (
                    //   <TouchableOpacity
                    //     style={[commonStyles.ActionBtn]}
                    //     key={index}
                    //     onPress={() => {
                    //       handleCompletePromise(promiseID, userN);
                    //       refreshCallback();
                    //       setActionState(!actionState);
                    //     }}>
                    //     <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                    //   </TouchableOpacity>
                    // );
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn]}
                          key={index}
                          onPress={() => {
                            // setIsLoading1(true);
                            const res = handleCompletePromiseWithModal(promiseID, userN)
                          }}>
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );

                  } else if (action === 'Fail') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            // setIsLoading1(true);
                            setBlank(true);
                            handleFailPromise(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling fail promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )


                    );
                  }
                  else if (action === 'Fulfilled') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleFulfilledPromiseApi(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling fulfilled promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )

                    );
                  } else if (action === 'Failed') {
                    return (
                      blank ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                          key={index}
                          onPress={() => {
                            setIsLoading1(true);
                            setBlank(true);
                            handleFailedPromiseApi(promiseID, userN)
                              .then((res) => {
                                console.log("response in details card", res);
                                if (res.code == 100) {
                                  setIsLoading1(false);
                                  refreshCallback();
                                  setActionState(!actionState);
                                } else {
                                  setBlank(false);
                                }
                              })
                              .catch((error) => {
                                console.error("Error in handling failed promise", error);
                                setIsLoading1(false);
                              });
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                        </TouchableOpacity>
                      )
                    );
                  }
                  else if (action == 'Pay') {
                    return (
                      hidePayButton ? (
                        <></>
                      ) : (

                        <TouchableOpacity
                          style={commonStyles.ActionBtn}
                          key={index}
                          onPress={navi}>
                          <Text style={{ color: "white" }}>{action}</Text>
                        </TouchableOpacity>
                      )
                    );
                  }
                })
              )

              }
              <Modal visible={isModalVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                      <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your completion message..."
                        value={textareaValue}
                        onChangeText={handleTextareaChange}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginBottom: 10, color: "black" }}
                      />

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {!isKeyboardVisible && (
                          <>
                            <TouchableOpacity
                              style={{ backgroundColor: '#32C35B', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 }}
                              onPress={handleCompleteAction}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 }}
                              onPress={() => {
                                setIsModalVisible(false);
                                setIsLoading1(false);
                                setIsLoading1(false);
                              }}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>
                          </>
                        )}


                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>


            </View>
          </View>
        </LinearGradient>
      ) : tab == 'Home' ? (
        promisetype === 'GUARANTEE' ? (
          <LinearGradient
            colors={
              promisor === userN ? ['#E4A936', '#EE8347'] : ['#73B6BF', '#2E888C']
            }
            style={DashBoardStyling.MainCardHome}
          >
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5),
                    marginLeft: wp(7),
                    marginTop: hp(1),
                    marginBottom: hp(1.2),
                  }}
                >
                  <Image
                    source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
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
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: hp(2),
                      marginLeft: hp(1.8),
                    }}
                  >
                    {promisor === userN
                      ? promiseeName
                      : promisorName
                        ? promisorName
                        : name}
                  </Text>
                </View>
                {isTimeBound ? (
                  <>
                    <View style={{ width: wp(5) }}>
                      <Entypo size={20} color="white" name="calendar" />
                    </View>

                    <View>
                      <Text
                        style={[
                          Headings.Input6,
                          {
                            marginLeft: wp(0.1),
                            color: 'white',
                            marginTop: wp(0.3),
                          },
                        ]}
                      >
                        {format(new Date(date), 'MM/dd/yyyy')}
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>

              <View style={{ marginHorizontal: hp(1.2), marginBottom: hp(1) }}>
                <Text style={styles.promisingText}>
                  {promisetype === 'GUARANTEE'
                    ? `${promisorName} is promising to ${promiseeName}`
                    : `${promiseeName} is promising to ${promisorName}`}
                </Text>
              </View>

              <View
                style={[
                  DashBoardStyling.PromiseReward,
                  { marginHorizontal: hp(2.4), marginBottom: hp(1) },
                ]}
              >
                {promisetype === 'GUARANTEE' ? (
                  amount ? (
                    <Text
                      style={{
                        color: 'black',
                        fontSize: hp(1.8),
                        backgroundColor: '#e0e0e0',
                        borderRadius: 50,
                        paddingVertical: wp(1.2),
                        paddingHorizontal: wp(2),
                      }}
                    >
                      ${amount}
                      {rewardPoints ? (
                        <Text
                          style={{
                            color: 'black',
                            fontSize: hp(1.8),
                            backgroundColor: '#e0e0e0',
                            borderRadius: 50,
                            paddingVertical: wp(1.2),
                            paddingHorizontal: wp(2),
                            marginLeft: wp(2),
                          }}
                        >
                          & {rewardPoints} pts
                        </Text>
                      ) : null}
                    </Text>
                  ) : null
                ) : promisetype === 'COMMITMENT' ? (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.8),
                      backgroundColor: '#e0e0e0',
                      borderRadius: 50,
                      paddingVertical: wp(1.2),
                      paddingHorizontal: wp(2),
                    }}
                  >
                    ${amount}{' '}
                    {rewardPoints ? (
                      <Text
                        style={{
                          color: 'black',
                          fontSize: hp(1.8),
                          backgroundColor: '#e0e0e0',
                          borderRadius: 50,
                          paddingVertical: wp(1.2),
                          paddingHorizontal: wp(2),
                          marginLeft: wp(2),
                        }}
                      >
                        & {rewardPoints} pts
                      </Text>
                    ) : null}
                  </Text>
                ) : null}
              </View>

              {ratingImpact ? (
                <View style={{ marginBottom: hp(1) }}>
                  <Text style={[styles.dynamicText, { marginHorizontal: hp(2.4) }]}>
                    Rating Will Impact
                  </Text>
                </View>
              ) : null}

              {displayStatus ? (
                <View style={{ marginBottom: hp(1) }}>
                  <Text style={[styles.statusText, { marginHorizontal: hp(2.4) }]}>
                    Promise {displayStatus}
                  </Text>
                </View>
              ) : null}

              {promiseMediaURL ? (
                <TouchableOpacity onPress={() => handelAttachedMedia(promiseMediaURL)}>
                  <View style={styles.homethumbnailContainer}>
                    <Video
                      source={{ uri: promiseMediaURL }}
                      style={styles.videoThumbnail}
                      paused={true} // Make sure the video is paused initially
                      resizeMode="cover"
                      controls={false}
                    />
                  </View>
                  <VideoModal
                    isVisible={isVideoModalVisible}
                    toggleModal={toggleVideoModal}
                    videoUrl={selectedVideo}
                  />
                </TouchableOpacity>
              ) : null}

              <View
                style={[
                  DashBoardStyling.PromiseGoal,
                  { marginBottom: hp(1) },
                ]}
              >
                <View sty={{ marginBottom: hp(1) }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: hp(2),
                      marginLeft: hp(2.8),
                    }}
                  >
                    {showFullText ? promiseGoal : `${promiseGoal.slice(0, 90)}`}
                  </Text>
                  {promiseGoal.length > 90 && (
                    <TouchableOpacity onPress={toggleText}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: hp(1.6),
                          marginLeft: hp(2.8),
                          paddingHorizontal: hp(0.2),
                          textDecorationLine: 'underline',
                        }}
                      >
                        {showFullText ? 'Read Less' : 'Read More'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={[styles.actionTextContainer, { marginHorizontal: hp(1.2), marginBottom: hp(1) }]}>
                {isLoading1 ? (
                  <></>
                ) : (
                  actions.map((action, index) => {
                    if (action === 'Accept') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                          </>
                        )
                      );
                    } else if (action === 'Fulfilled') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>Promisor has met the terms of the Promise, you can now fulfill or fail the resolution.</Text>
                          </>
                        )
                      );
                    } else if (action === 'Pay') {
                      return (
                        payButton && (
                          <>
                            <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                          </>
                        )
                      );
                    } else if (action === 'Complete') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>You can either complete or fail this promise</Text>
                          </>
                        )
                      );
                    }
                  })
                )
                }
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: hp(0.5),
                  width: wp(90),
                }}
              >
                {isLoading1 ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  actions.map((action, index) => {
                    if (action === 'Accept') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleAcceptPromise(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    setIsLoading1(false);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling accept promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )


                      );
                    } else if (action === 'Reject') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleRejectPromise(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    setIsLoading1(false);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling reject promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )


                      );
                    } else if (action === 'Complete') {
                      // return (
                      //   <TouchableOpacity
                      //     style={[commonStyles.ActionBtn]}
                      //     key={index}
                      //     onPress={() => {
                      //       handleCompletePromise(promiseID, userN);
                      //       refreshCallback();
                      //       setActionState(!actionState);
                      //     }}>
                      //     <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                      //   </TouchableOpacity>
                      // );
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn]}
                            key={index}
                            onPress={() => {
                              // setIsLoading1(true);
                              const res = handleCompletePromiseWithModal(promiseID, userN)
                            }}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )
                      );

                    } else if (action === 'Fail') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              handleFailPromise(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    setIsLoading1(false);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling fail promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )


                      );
                    }
                    else if (action === 'Fulfilled') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleFulfilledPromiseApi(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    setIsLoading1(false);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling fulfilled promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )


                      );
                    } else if (action === 'Failed') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleFailedPromiseApi(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res === 1) {
                                    setIsLoading1(false);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling failed promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )
                      );
                    }
                    else if (action == 'Pay') {
                      return (
                        hidePayButton ? (
                          <></>
                        ) : (

                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={navi}>
                            <Text style={{ color: "white" }}>{action}</Text>
                          </TouchableOpacity>
                        )
                      );
                    }
                  })
                )

                }
                <Modal visible={isModalVisible} transparent={true}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                      <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your completion message..."
                        value={textareaValue}
                        onChangeText={handleTextareaChange}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginBottom: 10, color: "black" }}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        {!isKeyboardVisible && (
                          <>

                            <TouchableOpacity
                              style={{ backgroundColor: '#32C35B', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 }}
                              onPress={handleCompleteAction}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 }}
                              onPress={() => setIsModalVisible(false)}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>
                          </>
                        )}

                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={
              (promisor == userN)
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
                    marginBottom: hp(1.2)
                  }}>
                  <Image
                    source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
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
                  <Text style={{ color: 'white', fontSize: hp(2), marginLeft: hp(1.8) }}>{promisor == userN ? promiseeName : promisorName ? promisorName : name}</Text>
                </View>
                {isTimeBound ? (
                  <>

                    <View style={{ width: wp(5) }}>
                      <Entypo size={20} color="white" name="calendar" />
                    </View>

                    <View>
                      <Text
                        style={[
                          Headings.Input6,
                          {
                            marginLeft: wp(0.1),
                            color: 'white',
                            marginTop: wp(0.3),
                          },
                        ]}>
                        {format(new Date(date), 'MM/dd/yyyy')}
                      </Text>
                    </View>
                  </>
                ) : (
                  null
                )}
              </View>

              <View style={{ marginHorizontal: hp(1.2), marginBottom: hp(1) }}>
                <Text style={styles.promisingTextHome}>
                  {status === 'Pending' ? `${promiseeName} is promising to ${promisorName}` : `${promisorName} is promising to ${promiseeName}`}
                </Text>
              </View>

              <View style={[DashBoardStyling.PromiseReward, { marginHorizontal: hp(2.4), marginBottom: hp(1) }]}>

                {amount ? (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    ${amount}
                    {rewardPoints ? (
                      <Text style={{
                        color: 'black',
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}> & {rewardPoints} pts
                      </Text>
                    ) : null}
                  </Text>
                ) : (
                  null
                )}


              </View>


              {ratingImpact ? (
                <View style={{ marginBottom: hp(1) }}>
                  <Text style={[styles.dynamicText, { marginHorizontal: hp(2.4) }]}>
                    Rating Will Impact
                  </Text>
                </View>
              ) : null}

              {displayStatus ? (
                <View style={{ marginBottom: hp(1) }}>
                  <Text style={[styles.statusText, { marginHorizontal: hp(2.4) }]}>
                    Promise {displayStatus}
                  </Text>
                </View>
              ) : null}

              {promiseMediaURL ? (
                <TouchableOpacity
                  onPress={() => handelAttachedMedia(promiseMediaURL)}>
                  <View style={styles.homethumbnailContainer}>
                    <Video
                      source={{ uri: promiseMediaURL }}
                      style={styles.videoThumbnail}
                      paused={true} // Make sure the video is paused initially
                      resizeMode="cover"
                      controls={false}
                    />
                  </View>
                  <VideoModal
                    isVisible={isVideoModalVisible}
                    toggleModal={toggleVideoModal}
                    videoUrl={selectedVideo}
                  />
                </TouchableOpacity>
              ) : null}

              <View style={[DashBoardStyling.PromiseGoal, { marginBottom: hp(1) }]}>
                <View>
                  <Text style={{ color: 'white', fontSize: hp(2), marginLeft: hp(2.8) }}>
                    {showFullText ? promiseGoal : `${promiseGoal.slice(0, 90)}`}
                  </Text>
                  {promiseGoal.length > 90 && (
                    <TouchableOpacity onPress={toggleText}>
                      <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: hp(1.6), marginLeft: hp(2.8),
                        paddingHorizontal: hp(0.2), textDecorationLine: "underline", margin: 0
                      }}>
                        {showFullText ? 'Read Less' : 'Read More'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={[styles.actionTextContainer, { marginHorizontal: hp(1, 2), marginBottom: hp(1) }]}>
                {isLoading1 ? (
                  <></>
                ) : (
                  actions.map((action, index) => {
                    if (action === 'Accept') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                          </>
                        )
                      );
                    } else if (action === 'Fulfilled') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>Promisor has met the terms of the Promise, you can now fulfill or fail the resolution.</Text>
                          </>
                        )
                      );
                    } else if (action === 'Pay') {
                      return (
                        payButton && (
                          <>
                            <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                          </>
                        )
                      );
                    } else if (action === 'Complete') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <>
                            <Text style={styles.actionText}>You can either complete or fail this promise</Text>
                          </>
                        )
                      );
                    }
                  })
                )

                }
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: hp(0.5),
                  width: wp(90),
                }}>
                {isLoading1 ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  actions.map((action, index) => {
                    if (action === 'Accept') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);

                              setBlank(true);
                              const promise = promisetype === 'GUARANTEE'
                                ? handleAcceptPromise(promiseID, userN)
                                : handleAccept(promiseID, userN);

                              promise
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )
                      )

                    } else if (action === 'Reject') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleReject(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling reject", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )

                      );
                    } else if (action === 'Fulfilled') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);
                              setBlank(true);
                              handleFulfilledPromiseApi(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    refreshCallback();
                                    setActionState(!actionState);
                                  } else {
                                    setBlank(false);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling fulfilled promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )

                      );
                    } else if (action === 'Failed') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);

                              handleFailedPromiseApi(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    setBlank(true);
                                    refreshCallback();
                                    setActionState(!actionState);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling failed promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )

                      );
                    } else if (action === 'Complete') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn]}
                            key={index}
                            onPress={() => {
                              // setIsLoading1(true);
                              const res = handleCompletePromiseWithModal(promiseID, userN);
                              if (res === 1) {
                                setIsLoading1(false);
                              }
                              refreshCallback();
                              setActionState(!actionState);
                            }}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )
                      );
                    } else if (action === 'Fail') {
                      return (
                        blank ? (
                          <></>
                        ) : (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn, { backgroundColor: 'red' }]}
                            key={index}
                            onPress={() => {
                              setIsLoading1(true);

                              handleFailPromise(promiseID, userN)
                                .then((res) => {
                                  console.log("response in details card", res);
                                  if (res.code == 100) {
                                    refreshCallback();
                                    setActionState(!actionState);
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error in handling fail promise", error);
                                })
                                .finally(() => {
                                  setIsLoading1(false);
                                });
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: '700' }}>{action}</Text>
                          </TouchableOpacity>
                        )

                      );
                    } else if (action == 'Pay') {
                      return (
                        hidePayButton ? (
                          <></>
                        ) : (

                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={navi}>
                            <Text style={{ color: "white" }}>{action}</Text>
                          </TouchableOpacity>
                        )

                      );
                    }
                  })
                )

                }

                <Modal visible={isModalVisible} transparent={true}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                      <TextInput
                        multiline
                        numberOfLines={3}
                        placeholder="Enter your completion message..."
                        value={textareaValue}
                        onChangeText={handleTextareaChange}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, color: "black", fontSize: hp(1.8) }}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        {!isKeyboardVisible && (
                          <>

                            <TouchableOpacity
                              style={{ backgroundColor: '#32C35B', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 }}
                              onPress={handleCompleteAction}>
                              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp(1.6) }}>Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 }}
                              onPress={() => setIsModalVisible(false)}>
                              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp(1.6) }}>Close</Text>
                            </TouchableOpacity>
                          </>
                        )}

                      </View>
                    </View>
                  </View>
                </Modal>

              </View>

            </View>
          </LinearGradient>
        )


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

  promisingText: {
    color: 'black',
    marginHorizontal: hp(1.2),
    marginTop: hp(1.2),
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: wp(1.2),
    paddingHorizontal: wp(1.2),
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
    // marginBottom: hp(1.2),
  },

  promisingTextGaurantee: {
    color: 'black',
    marginHorizontal: hp(1.2),
    marginTop: hp(1.2),
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: wp(1.2),
    paddingHorizontal: wp(1.2),
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
  },

  promisingTextHome: {
    color: 'black',
    marginHorizontal: hp(1.2),
    marginTop: hp(1.2),
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: wp(1.2),
    paddingHorizontal: wp(1.2),
    alignSelf: 'flex-start',
  },

  amountRewardText: {
    color: 'black',
    marginHorizontal: hp(1.2),
    //  justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  baseText: {
    color: 'black',
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: hp(1.2),
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
  },


  dynamicText: {
    color: 'black',
    marginHorizontal: hp(1.2),
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
  },

  statusText: {
    color: 'black',
    fontSize: hp(1.8),
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
  },


  promiseGoalContainer: {
    alignItems: 'flex-start', // Ensures the text aligns to the start
    paddingHorizontal: hp(2), // Adjust the padding if needed
  },
  promiseGoalText: {
    color: 'white',
    fontSize: hp(2),
  },

  actionTextContainer: {
    alignItems: 'flex-start', // Ensures the text aligns to the start
    paddingHorizontal: hp(2), // Adjust the padding if needed
  },

  actionText: {
    color: 'white',
    fontSize: hp(1.5),
  },


  thumbnailContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    marginHorizontal: hp(1.5), // Adjust this as needed
    borderRadius: 20,
    overflow: 'hidden', // Ensure child elements respect the border radius
    marginBottom: hp(1)
  },

  homethumbnailContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    marginHorizontal: hp(2.5), // Adjust this as needed
    marginTop: 10, // Adjust this as needed
    borderRadius: 20,
    overflow: 'hidden', // Ensure child elements respect the border radius
    marginBottom: hp(1)
  },

  videoThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // Apply border radius to the video as well
  },
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

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
  TextInput
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
  navigation,
  jugaar,
  displayStatus,
  status
}) => {
  const [isPaymentWebViewVisible, setIsPaymentWebViewVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [forName, setForName] = useState(false);
  const [actionState, setActionState] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const handleCompletePromiseWithModal = (promiseID, userN) => {
    // Additional logic to handle complete promise with modal
    setIsModalVisible(true);
  };

  const handleTextareaChange = (text) => {
    setTextareaValue(text);
  };

  const handleCompleteAction = () => {
    handleCompletePromise(promiseID, userN, textareaValue);
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
    navigation,
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
            <View>
              <Text style={styles.promisingText}>
                {promiseeName} is promising to {promisorName}
              </Text>
            </View>
            <View style={DashBoardStyling.PromiseReward}>
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
              <View>
                <Text style={styles.dynamicText}>
                  Rating Will Impact
                </Text>
              </View>
            ) : null}

            {displayStatus ? (
              <View>
                <Text style={styles.statusText}>
                  {displayStatus}
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

            <View style={[styles.promiseGoalContainer, { marginTop: hp(1.2) }]}>
              <View>
                <Text style={styles.promiseGoalText}>
                  {promiseGoal}
                </Text>
              </View>
            </View>

            <View style={styles.actionTextContainer}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                    </>
                  );
                } else if (action === 'Fulfilled') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either Fulfill or Fail this promise</Text>
                    </>
                  );
                } else if (action === 'Pay') {
                  return (
                    <>
                      <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                    </>
                  );
                } else if (action === 'Complete') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either accept or reject this promise</Text>
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
                        // handleCompletePromise(promiseID, userN);
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
            <View>
              <Text style={styles.promisingText}>
                {promisorName} is promising to {promiseeName}
              </Text>
            </View>

            {(amount > 0 || rewardPoints > 0) && (

              <View style={styles.amountRewardText}>

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
                              marginBottom: hp(1.2),
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
                        marginBottom: hp(1.2),
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
                              marginHorizontal: 10,
                              marginBottom: hp(1.2)
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
                            marginBottom: hp(1.2)
                          },
                        ]}> & {rewardPoints} pts </Text>}
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
            )}

            {ratingImpact ? (
              <View>
                <Text style={styles.dynamicText}>
                  Rating Will Impact
                </Text>
              </View>
            ) : null}

            {displayStatus ? (
              <View>
                <Text style={styles.statusText}>
                  {displayStatus}
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
            <View style={[styles.promiseGoalContainer, { marginTop: hp(1.2) }]}>
              <View>
                <Text style={styles.promiseGoalText}>
                  {promiseGoal}
                </Text>
              </View>
            </View>

            <View style={styles.actionTextContainer}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                    </>
                  );
                } else if (action === 'Fulfilled') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either Fulfill or Fail this promise</Text>
                    </>
                  );
                } else if (action === 'Pay') {
                  return (
                    <>
                      <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                    </>
                  );
                } else if (action === 'Complete') {
                  return (
                    <>
                      <Text style={styles.actionText}>You can either accept or reject this promise</Text>
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
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => handleCompletePromiseWithModal(promiseID, userN)}>
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
                    </View>
                  </View>
                </View>
              </Modal>


            </View>
          </View>
        </LinearGradient>
      ) : tab == 'Home' ? (
        promisetype === 'GUARANTEE' ? (
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

              <View style={{ marginHorizontal: hp(1.2) }}>
                <Text style={styles.promisingText}>
                  {promisetype === 'GUARANTEE' ? `${promisorName} is promising to ${promiseeName}` : `${promiseeName} is promising to ${promisorName}`}
                </Text>
              </View>

              <View style={[DashBoardStyling.PromiseReward, { marginHorizontal: hp(2.4), marginBottom: hp(1.2) }]}>
                {promisetype === 'GUARANTEE' ? (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      // marginBottom: hp(1.2)
                    }}>
                    $ {amount}
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
                ) : promisetype === 'COMMITMENT' ? (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      // marginBottom: hp(1.2)
                    }}>
                    ${amount} {' '}
                    {rewardPoints ? (
                      <Text style={{
                        color: 'black',
                        fontSize: hp(1.8),
                        backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginLeft: 20,
                      }}>
                        & {rewardPoints} pts
                      </Text>
                    ) : null}
                  </Text>
                ) : null}
              </View>


              {ratingImpact ? (
                <View>
                  <Text style={[styles.dynamicText, { marginHorizontal: hp(2.4) }]}>
                    Rating Will Impact
                  </Text>
                </View>
              ) : null}

              {displayStatus ? (
                <View>
                  <Text style={[styles.statusText, { marginHorizontal: hp(2.4) }]}>
                    {displayStatus}
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

              <View style={[DashBoardStyling.PromiseGoal, { marginTop: hp(1.2), marginBottom: hp(1.2) }]}>
                <View>
                  <Text style={{ color: 'white', fontSize: hp(2), marginLeft: hp(2.8) }}>
                    {promiseGoal}
                  </Text>
                </View>
              </View>

              <View style={[styles.actionTextContainer, { marginHorizontal: hp(1, 2) }]}>
                {actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                      </>
                    );
                  } else if (action === 'Fulfilled') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either Fulfill or Fail this promise</Text>
                      </>
                    );
                  } else if (action === 'Pay') {
                    return (
                      <>
                        <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                      </>
                    );
                  } else if (action === 'Complete') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either accept or reject this promise</Text>
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
                          if (promisetype === 'GUARANTEE') {
                            handleAcceptPromise(promiseID, userN);
                            refreshCallback();
                            setActionState(!actionState);
                          } else {
                            handleAccept(promiseID, userN);
                            refreshCallback();
                            setActionState(!actionState);
                          }


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
                  } else if (action === 'Fulfilled') {
                    return (
                      <TouchableOpacity
                        style={commonStyles.ActionBtn}
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
                  } else if (action === 'Complete') {
                    return (
                      <TouchableOpacity
                        style={[commonStyles.ActionBtn]}
                        key={index}
                        onPress={() => handleCompletePromiseWithModal(promiseID, userN)}>
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

              <View style={{ marginHorizontal: hp(1.2) }}>
                <Text style={styles.promisingText}>
                  {status === 'Pending' ? `${promiseeName} is promising to ${promisorName}` : `${promisorName} is promising to ${promiseeName}`}
                </Text>
              </View>

              <View style={[DashBoardStyling.PromiseReward, { marginHorizontal: hp(2.4), marginBottom: hp(1.2) }]}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      // marginBottom: hp(1.2)
                    }}>
                    $ {amount}
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
                
              </View>


              {ratingImpact ? (
                <View>
                  <Text style={[styles.dynamicText, { marginHorizontal: hp(2.4) }]}>
                    Rating Will Impact
                  </Text>
                </View>
              ) : null}

              {displayStatus ? (
                <View>
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

              <View style={[DashBoardStyling.PromiseGoal, { marginTop: hp(1.2), marginBottom: hp(1.2) }]}>
                <View>
                  <Text style={{ color: 'white', fontSize: hp(2), marginLeft: hp(2.8) }}>
                    {promiseGoal}
                  </Text>
                </View>
              </View>

              <View style={[styles.actionTextContainer, { marginHorizontal: hp(1, 2) }]}>
                {actions.map((action, index) => {
                  if (action === 'Accept') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either accept or reject this promise</Text>
                      </>
                    );
                  } else if (action === 'Fulfilled') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either Fulfill or Fail this promise</Text>
                      </>
                    );
                  } else if (action === 'Pay') {
                    return (
                      <>
                        <Text style={styles.actionText}>Pay the amount to complete this promise</Text>
                      </>
                    );
                  } else if (action === 'Complete') {
                    return (
                      <>
                        <Text style={styles.actionText}>You can either accept or reject this promise</Text>
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
                          if (promisetype === 'GUARANTEE') {
                            handleAcceptPromise(promiseID, userN);
                            refreshCallback();
                            setActionState(!actionState);
                          } else {
                            handleAccept(promiseID, userN);
                            refreshCallback();
                            setActionState(!actionState);
                          }


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
                  } else if (action === 'Fulfilled') {
                    return (
                      <TouchableOpacity
                        style={commonStyles.ActionBtn}
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
                  } else if (action === 'Complete') {
                    return (
                      <TouchableOpacity
                        style={[commonStyles.ActionBtn]}
                        key={index}
                        onPress={() => {
                          handleCompletePromiseWithModal(promiseID, userN);
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

                <Modal visible={isModalVisible} transparent={true}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                      <TextInput
                        multiline
                        numberOfLines={3}
                        placeholder="Enter your completion message..."
                        value={textareaValue}
                        onChangeText={handleTextareaChange}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5,  marginBottom: 10, color: "black" , fontSize: hp(1.8)}}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                          style={{ backgroundColor: '#32C35B', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 }}
                          onPress={handleCompleteAction}>
                          <Text style={{ color: 'white', fontWeight: 'bold' ,fontSize: hp(1.6)}}>Complete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 }}
                          onPress={() => setIsModalVisible(false)}>
                          <Text style={{ color: 'white', fontWeight: 'bold' ,fontSize: hp(1.6)}}>Close</Text>
                        </TouchableOpacity>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
    marginBottom: hp(1.2),
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
    marginBottom: hp(1.2),
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
    marginBottom: hp(1.2),
    alignSelf: 'flex-start', // Ensures the width adjusts according to the content
  },

  statusText: {
    color: 'black',
    marginHorizontal: hp(1.2),
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
    marginTop: 10, // Adjust this as needed
    borderRadius: 20,
    overflow: 'hidden', // Ensure child elements respect the border radius
  },

  homethumbnailContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    marginHorizontal: hp(2.5), // Adjust this as needed
    marginTop: 10, // Adjust this as needed
    borderRadius: 20,
    overflow: 'hidden', // Ensure child elements respect the border radius
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

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DashBoardStyling } from '../../Styling/DashBoard';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { Headings } from '../../Styling/Headings';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import { selectedVideoR } from '../../recoil/AddPromise';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';

const MiniCard = ({
  promiseeProfileImageUrl,
  promisetype,
  amount,
  name,
  date,
  promiseMediaURL,
  tab,
  guaranteedWithMoney,
  rewardPoints,
  isTimeBound,
}) => {

  const [markCompleted, setMarkCompleted] = useState(false);
  const [markFailed, setMarkFailed] = useState(false);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const handelAttachedMedia = (urll) => {
    setSelectedVideo(urll);
    toggleVideoModal(); // Open the video modal
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
                {/* Close button */}
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

  return (
    <>
      {tab == 'UserPromiseReq' || tab == 'ReqPromiseDashboard' ? (
        <LinearGradient
          colors={
            tab == 'UserPromiseReq'
              ? ['#E4A936', '#EE8347']
              : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MiniCard}>
          <View>
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
                <Text style={{ color: 'white', fontSize: hp(2), fontWeight: 'bold', }}>{name}</Text>
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

            <View style={DashBoardStyling.PromiseReward}>
              {guaranteedWithMoney ? (
                <Text
                  style={[
                    {
                      color: 'black',
                      marginHorizontal: hp(8.2),
                      fontSize: hp(1.8),
                      backgroundColor: "#e0e0e0",
                      borderRadius: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    },
                  ]}>
                   ${amount} {rewardPoints ? (
                    <Text> & {rewardPoints} pts</Text>
                  ) : null}
                </Text>
              ) : null}

            </View>
          </View>
        </LinearGradient>
      ) : tab == 'PromisestoMe' || tab == 'Promise' ? (
        <LinearGradient
          colors={
            tab == 'Promise' ? ['#E4A936', '#EE8347'] : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MiniCard}>
          <View style={{ paddingBottom: 20 }}>
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
                <Text style={{ color: 'white', fontSize: hp(2), fontWeight: 'bold', }}>{name}</Text>
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

            <View style={{ paddingHorizontal: 15 }}>

              <View style={[
                DashBoardStyling.PromiseReward1,
                {
                  justifyContent: (promisetype === 'GUARANTEE' && amount > 0) || (promisetype === 'COMMITMENT' && amount > 0) || rewardPoints ? 'space-around' : 'center'
                }
              ]}>
                <View>
                  {promisetype == 'GUARANTEE' && amount > 0 ? (
                    <Text
                      style={[
                        {
                          color: 'black',
                          marginHorizontal: hp(1.2),
                          fontSize: hp(1.8),
                          backgroundColor: "#e0e0e0",
                          borderRadius: 50,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        },
                      ]}>
                      {amount > 0 ? (
                        <>
                           ${amount}
                          {rewardPoints ? <Text >& {rewardPoints} pts</Text>
                            : null}
                        </>
                      ) : (
                        null
                      )}
                    </Text>
                  ) : promisetype == 'COMMITMENT' && amount > 0 ? (
                    <Text
                      style={[
                        {
                          color: 'black',
                          marginHorizontal: hp(1.2),
                          fontSize: hp(1.8),
                          backgroundColor: "#e0e0e0",
                          borderRadius: 50,
                          paddingVertical: 5,
                          paddingHorizontal: 10,

                        },
                      ]}>
                      {amount > 0 ? (
                        <>
                           ${amount} &nbsp;
                          {rewardPoints ? <Text >& {rewardPoints} pts</Text>
                            : null}
                        </>
                      ) : (
                        null
                      )}
                    </Text>
                  ) : (
                    rewardPoints ? (

                      <Text
                        style={[
                          {
                            color: 'black',
                            marginHorizontal: hp(1.2),
                            fontSize: hp(1.8),
                            backgroundColor: "#e0e0e0",
                            borderRadius: 50,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          },
                        ]}>
                        {rewardPoints ? <Text style={{}}>Reward: ${amount} & {rewardPoints} Pts</Text>
                          : null}
                      </Text>
                    ) : (
                      null
                    )
                  )
                  }
                </View>
                <View>
                  {promiseMediaURL ? (
                    <TouchableOpacity
                      onPress={() => handelAttachedMedia(promiseMediaURL)}>
                      <FontAw5 color="#652D90" name="youtube" size={23} />
                      <VideoModal />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      ) : null}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default MiniCard;

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilState } from 'recoil';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import {
  promiseType,
  promiseAmounnt,
  deadline,
  MakeaPromise,
  startDate,
  isStartDateModalV,
  isEndDateModalV,
  IsTimeBound,
  promiseReward,
  selectedPromisee,
  PaymentCheck,
  RewardCheck,
  istimeBoundCheckBox1,
  istimeBoundCheckBox2,
  RatingImapect,
  Guaranteed,
  RewardPoints,
  RewardPointsState,
  selectedMedia,
  selectMedia,
} from '../recoil/AddPromise';
import { Headings } from '../Styling/Headings';
import PromiseStatement from '../comp/makePromise/PromiseStatement';
import PromiseButtons from '../comp/makePromise/Buttons';
import { commonStyles } from '../Styling/buttons';
import StartModal from '../comp/makePromise/Calender/StartModal';
import { useIsFocused } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import { ToastAndroid } from 'react-native';


const MakePromise = ({ navigation }) => {
  const [financial, setFinancial] = useRecoilState(promiseType);
  const [isChecked1, setIsChecked1] = useState(istimeBoundCheckBox1);
  const [isChecked2, setIsChecked2] = useState(istimeBoundCheckBox2);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);
  const [startDa, setStartDate] = useRecoilState(startDate);
  const [paymentCheck, setpaymentCheck] = useRecoilState(PaymentCheck);
  const [rewardCheck, setrewardCheck] = useRecoilState(RewardCheck);
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);
  const [promiseStatement, setPromiseStatement] = useState('');
  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [rewardPoints, setRewardPoints] = useRecoilState(RewardPoints);
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [preward, setPreward] = useRecoilState(promiseReward);
  const [selectEndDate, setSelectEndDate] = useState(false);
  const [startDateMV, setStartDateMV] = useRecoilState(isStartDateModalV);
  const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV);
  const currentDate = new Date();
  const [isRating, setIsRating] = useRecoilState(RatingImapect);
  const [rewardPointState, setRewardPointState] = useRecoilState(RewardPointsState);
  const [selectedMediaURI, setSelectedMediaURI] = useRecoilState(selectedMedia);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectMedia);


  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];
  const focus = useIsFocused();


  const toggleCheckBox1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
    setIsTimeB(false);
  };

  const handelNonFin = () => {
    setFinancial(false), setpaymentCheck(false);
    setPreward('+20');
    setrewardCheck(true);
  };


  const toggleCheckBox2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
    setIsTimeB(true);
  };

  useEffect(() => {
    console.log(promiseType,"promise type")
  }, [focus]);




  const handleTextChange = (text) => {
    setPromiseStatement(text);
    console.log('Promise statement changed:', text);
  };

  const handleNextButtonPress = () => {
    if (isTimeB) {
      if (!startDa) {
        ToastAndroid.showWithGravityAndOffset(
          'Please select compilation date',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        
        const promiseText = promiseStatement;
        if ((!promiseText || promiseText.trim() === '') && !selectedVideo) {
          ToastAndroid.showWithGravityAndOffset(
            'Please attach video or write promise statement',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if (selectEndDate) {
          navigation.navigate('Review');
          console.log('Reward points', rewardPoints);
          console.log('Promise Amount', amount);

        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Please select compilation date',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      }
    } else {
      const promiseText = promiseStatement;
      console.log("selected media from parent", selectedVideo, "textttttt". promiseText)

      if ((!promiseText || promiseText.trim() === '') && !selectedVideo) {
        ToastAndroid.showWithGravityAndOffset(
          'Please attach video or write promise statement',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        navigation.navigate('Review');
        console.log('Reward points', rewardPoints);
      }
    }
  };





  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <View
      style={{
        backgroundColor: '#e4eee6',
        height: '100%',
        alignItems: 'center',
      }}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={{ position: 'absolute', left: wp(3), top: hp(1.5) }} onPress={handleBack}>

          <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />

        </TouchableOpacity>
      )}
      <View style={styles.LogoC}>
        <Image
          source={require('../source/mainLogo.jpg')}
          style={styles.ImageStyle}
        />
      </View>
      <View style={{ borderWidth: 1 }}>
        <PromiseButtons />
      </View>

      <ScrollView>
        <View style={{ marginTop: hp(2) }}>
          <Text style={Headings.Input3}>Promise Time Bound</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(0.5),
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: hp(1.5),
              }}>
              <TouchableOpacity
                onPress={toggleCheckBox1}
                style={[!isTimeB ? styles.checked : styles.unchecked]}>
                {!isTimeB && (
                  <View style={styles.innerCircle}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text
                style={[Headings.Input3, { marginLeft: wp(4), fontSize: hp(2) }]}>
                No
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={toggleCheckBox2}
                style={isTimeB ? styles.checked : styles.unchecked}>
                {isTimeB && (
                  <View style={styles.innerCircle}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text
                style={[Headings.Input3, { marginLeft: wp(4), fontSize: hp(2) }]}>
                Yes
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: hp(1),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>

          {isTimeB ? (
            <View style={{
              marginBottom: hp(2), flex: 1, justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Text style={[{ marginVertical: hp(0.5) }, Headings.Input3]}>
                Compilation Date
              </Text>
              <View
                style={{
                  marginTop: hp(0),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginLeft: wp(3),
                    width: wp(30),
                    height: hp(5),
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity

                    onPress={() => {
                      setStartDateMV(true)
                      setSelectEndDate(true);
                    }
                    }
                    style={styles.DateCB}>
                    {startDa == '' ? (
                      <Text style={{
                        color: '#000'
                      }}> Select Date</Text>
                    ) : (
                      <Text style={{
                        color: '#000'
                      }}>{startDa}</Text>
                    )}

                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    style={{ height: hp(40), backgroundColor: 'red' }}
                    visible={startDateMV}
                    onRequestClose={() => setStartDateMV(false)}>
                    <StartModal />
                  </Modal>
                </View>


              </View>

            </View>
          ) : null}
        </View>

        <View style={{ width: wp(90), marginTop: hp(0.5) }}>
          <View style={styles.ToggelBox}>
            {makePromise ? (
              <Text style={Headings.Input3}>Guaranteed $</Text>
            ) : (
              <Text style={Headings.Input3}>Rewards $</Text>
            )}
            <ToggleSwitch
              isOn={financial}
              style={{ marginRight: wp(2) }}
              onColor="#FFFFFF"
              offColor="#FFFFFF"
              thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
              thumbOnStyle={{ backgroundColor: '#652D90' }}
              size="small"
              onToggle={() => {
                setFinancial(!financial);
              }}
            />


          </View>
          {financial && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(5),
                  justifyContent: 'center',
                  gap: 8
                }}>
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  style={{
                    height: hp(5),
                    color: '#000',
                    fontSize: hp(1.8),
                    borderWidth: wp(0.6),
                    borderColor: '#652D90',
                    borderRadius: wp(10),
                    width: wp(30),
                    borderRadius: wp(5),
                    textAlign: "center"
                  }}
                  placeholderTextColor="black"
                  onChangeText={text => setAmount(text)}
                  keyboardType="phone-pad"
                />
                {!makePromise && (      
                <TextInput
                  placeholder="Points"
                  placeholderTextColor="black"
                  value={rewardPoints}
                  style={{
                    height: hp(5),
                    color: '#000',
                    fontSize: hp(1.8),
                    borderWidth: wp(0.6),
                    borderColor: '#652D90',
                    borderRadius: wp(10),
                    width: wp(30),
                    borderRadius: wp(5),
                    textAlign: "center"
                  }}
                  onChangeText={text => setRewardPoints(text)}
                  keyboardType="phone-pad"
                />
                )}

              </View>
            </>
          )}
          <View
            style={{
              marginVertical: hp(2),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>

          <View style={styles.ToggelBox}>
            <View style={styles.ToggelBox}>
              <Text style={Headings.Input3}>Rating Impact?</Text>
              <ToggleSwitch
                isOn={isRating}
                style={{ marginRight: wp(2) }}
                onColor="#FFFFFF"
                offColor="#FFFFFF"
                thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                thumbOnStyle={{ backgroundColor: '#652D90' }}
                size="small"
                onToggle={() => {
                  setIsRating(!isRating);
                }}
              />


            </View>
          </View>
          <View>
           <View>
              <PromiseStatement onTextChange={handleTextChange} />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleNextButtonPress}
            style={[commonStyles.lognBtn, { marginBottom: hp(4) }]}>
            <LinearGradient
              colors={makePromise ? bgBtnmakeprms : bgBtnrqstprms}
              style={[
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  borderRadius: wp(50),
                },
              ]}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default MakePromise;

const styles = StyleSheet.create({
  LogoC: {
    width: '100%',
    height: hp(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: hp(9),
    height: hp(9),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
  Box: {
    width: wp(43),
    height: hp(16),
    marginTop: hp(0.5),
    borderRadius: wp(6),
  },
  keyB: {
    width: wp(90),
    height: hp(30),
    marginLeft: wp(40),
  },
  boxText: {
    height: hp(10),
    marginHorizontal: hp(1),
  },
  unchecked: {
    width: wp(5),
    height: hp(2.5),
    borderRadius: wp(2.5),
    borderWidth: 2,
    borderColor: '#652D90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: wp(5),
    height: hp(2.5),
    borderRadius: hp(2.5),
    backgroundColor: '#652D90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: wp(5),
    height: hp(2.5),
    borderRadius: hp(2.5),
    backgroundColor: '#652D90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: hp(1.5),
    color: 'white',
  },
  DateCB: {
    borderWidth: wp(0.6),
    borderColor: '#652D90',
    borderRadius: wp(10),
    fontSize: hp(1.3),
    marginLeft: wp(2),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ToggelBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    height: hp(7),
  },
});

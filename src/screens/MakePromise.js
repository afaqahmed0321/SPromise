import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // for Date
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buttons from '../comp/makePromise/Buttons';
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
} from '../recoil/AddPromise';
import { Headings } from '../Styling/Headings';
import PromiseStatement from '../comp/makePromise/PromiseStatement';
import PromiseButtons from '../comp/makePromise/Buttons';
import { commonStyles } from '../Styling/buttons';
import StartModal from '../comp/makePromise/Calender/StartModal';
import EndDateModal from '../comp/makePromise/Calender/EndDateModal';
import { useIsFocused } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import { ToastAndroid } from 'react-native';


const MakePromise = ({ navigation }) => {
  // const [isChecked, setIsChecked] = useState(false);
  // const [financial, setFinancial] = useRecoilState(promiseType);
  // const [financial, setFinancial] = useState(false);
  const [isChecked1, setIsChecked1] = useState(istimeBoundCheckBox1);
  const [isChecked2, setIsChecked2] = useState(istimeBoundCheckBox2);
  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(startDate);
  const [paymentCheck, setpaymentCheck] = useRecoilState(PaymentCheck);
  const [rewardCheck, setrewardCheck] = useRecoilState(RewardCheck);

  const currentDate = new Date();

  // const [guranted, setGuranted] = useState(Guaranteed);

  // const [isChecked, setIsChecked] = useState(false);
  const [financial, setFinancial] = useRecoilState(promiseType);
  // const [isEnabled, setIsEnabled] = useState(promiseType);
  const [isRating, setIsRating] = useRecoilState(RatingImapect);

  const [rewardPointState, setRewardPointState] = useRecoilState(RewardPointsState);

  // const toggleSwitch = () => {
  //   // setIsEnabled(!isEnabled); // Toggle the value of isEnabled
  //   isEnabled ? setIsEnabled(false) : setIsEnabled(true);
  //   isEnabled ? setFinancial(true) :  setFinancial(false)
  //   setTimeout(function() {
  //     console.log("Timeout completed!", );
  //     console.log(financial, isEnabled);
  //   }, 1500);
  // };

  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [rewardPoints, setRewardPoints] = useRecoilState(RewardPoints);
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [preward, setPreward] = useRecoilState(promiseReward);
  // const [selectStartDate, setselectStartDate] = useState(false);
  // const [selectEndDate, setSelectEndDate] = useState(false);
  const [startDateMV, setStartDateMV] = useRecoilState(isStartDateModalV);
  const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV);
  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];
  const focus = useIsFocused();
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);

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

  const handelFin = () => {
    setrewardCheck(false);
    setpaymentCheck(true);
    setFinancial(true);
    setPreward('0');
  };

  const toggleCheckBox2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
    setIsTimeB(true);
  };

  useEffect(() => {
    // fetchData()
    // setpaymentCheck(false)
    // setrewardCheck(false)
    // setAmount('')
    // setIsChecked1(false)
    // setIsChecked2(false)
    // setSelectedPromisee({})
  }, [focus]);


  const [promiseStatement, setPromiseStatement] = useState('');

  const handleTextChange = (text) => {
    setPromiseStatement(text);
    // Handle text change as needed in the parent component
    console.log('Promise statement changed:', text);
  };

  const handleNextButtonPress = () => {
    if (!isTimeB) {
      ToastAndroid.showWithGravityAndOffset(
        'Please select compilation date',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      const promiseText = promiseStatement;
      if (!promiseText || promiseText.trim() === '') {
        ToastAndroid.showWithGravityAndOffset(
          'Promise statement cannot be empty',
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
          {/* <EvilIcon
            name="arrow-left"
            size={40}
            color="black"
          /> */}
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
      {/* <View
        style={{
          marginVertical: hp(1),
          height: hp(0.2),
          backgroundColor: '#AAAAAA',
          width: wp(90),
        }}></View/}
      {/* <View style={{width: wp(90)}}>
        <Text style={[Headings.Input3]}>Choose Promise Type</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: wp(3),
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', marginLeft: 50}}
            onPress={handelFin}>
            <View style={[paymentCheck ? styles.checked : styles.unchecked]}>
              {paymentCheck && (
                <View style={styles.innerCircle}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              )}
            </View>
            <Text style={Headings.Input3}>Financial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={handelNonFin}>
            <View style={[rewardCheck ? styles.checked : styles.unchecked]}>
              {rewardCheck && (
                <View style={styles.innerCircle}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              )}
            </View>
            <Text style={Headings.Input3}>Non Financial</Text>
          </TouchableOpacity>
        </View>
      </View>
      {financial ? (
        <View>
          <View
            style={{
              marginVertical: hp(1),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', height: hp(5)}}>
            <Text style={Headings.Input3}>Promise Amount </Text>
            <TextInput
              placeholder="Write amount.."
              value={amount}
              style={{height: hp(5), marginLeft: wp(18), fontSize: hp(1.8)}}
              onChangeText={text => setAmount(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View
            style={{
              marginTop: hp(0.6),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>
        </View>
      ) : (
        <View>
          <View
            style={{
              marginVertical: hp(1),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', height: hp(5)}}>
            <Text style={Headings.Input3}>Promise Reward </Text>
            <Text style={[{marginLeft: wp(20)}, Headings.Input3]}>+20</Text>
          </View>

          <View
            style={{
              marginTop: hp(0.6),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>
        </View>
      )} */}
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
          {/* Select Date  */}

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

                    onPress={() => setStartDateMV(true)}
                    style={styles.DateCB}>
                    {startDa == '' ? (
                      <Text style={{
                        color: '#000'
                      }}> yyyy-mm-dd</Text>
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
                {/* <View
                  style={{
                    marginLeft: wp(3),
                    width: wp(43),
                    height: hp(5),
                    justifyContent: 'center',
                    color: '#000'
                  }}>
                  <TouchableOpacity
                    onPress={() => setEndDateMV(true)}
                    style={styles.DateCB}>
                    {deadlinedate === '' ? (
                      <Text
                        style={{
                          color: '#000'
                        }}

                      > Select End Date</Text>
                    ) : (
                      <Text
                        style={{
                          color: '#000'
                        }}
                      >{deadlinedate}</Text>
                    )}
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    style={{ height: hp(40), backgroundColor: 'red' }}
                    visible={endDateMV}
                    onRequestClose={() => setEndDateMV(false)}>
                    <EndDateModal />
                  </Modal>
                </View> */}

                {/* <View style={{marginRight: wp(6), width: wp(43), height: hp(5)}}>
            <TouchableOpacity
              
              onPress={() => setEndDateMV(true)} 
              style={styles.DateCB}>
              {deadlinedate == '' ? 
                <Text>Select End Date</Text>
               : 
                <Text>{deadlinedate}</Text>
              }
            
            </TouchableOpacity>
            <Modal
          animationType="slide"
          transparent={true}
            style={{height: hp(40), backgroundColor: 'red'}}
          visible={endDateMV}
          onRequestClose={() => setEndDateMV(false)}>
          <StartModal />
        </Modal>
          </View> */}
              </View>
              {/* <View
              style={{
                marginTop: hp(1),
                height: hp(0.2),
                backgroundColor: '#AAAAAA',
                width: wp(90),
              }}></View> */}
            </View>
          ) : null}
        </View>

        <View style={{ width: wp(90), marginTop: hp(0.5) }}>
          <View style={styles.ToggelBox}>
            {makePromise ? (
              <Text style={Headings.Input3}>Guaranted $</Text>
            ) : (
              <Text style={Headings.Input3}>Commitment $</Text>
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

            {/* <Text style={Headings.Input3}>Guaranted $</Text> */}
            {/* <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}
          </View>
          {financial ? (
            <>
              {/* <View
                style={{
                  marginVertical: hp(2),
                  height: hp(0.2),
                  backgroundColor: '#AAAAAA',
                  width: wp(90),
                }}></View> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(5),
                  justifyContent: 'space-between',
                }}>
                {/* <Text style={Headings.Input3}>Amount</Text> */}
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  style={{
                    height: hp(5),
                    color: '#000',
                    // marginLeft: wp(18),
                    fontSize: hp(1.8),
                    // borderWidth: hp(.1),
                    borderWidth: wp(0.6),
                    borderColor: '#652D90',
                    borderRadius: wp(10),
                    width: wp(42),
                    borderRadius: wp(5),
                    paddingLeft: wp(3),
                  }}
                  placeholderTextColor="black"
                  onChangeText={text => setAmount(text)}
                  keyboardType="phone-pad"
                />
                <TextInput
                  placeholder="Reward Points"
                  value={rewardPoints}
                  style={{
                    height: hp(5),
                    // marginLeft: wp(18),
                    fontSize: hp(1.8),
                    // borderWidth: hp(.1),
                    borderWidth: wp(0.6),
                    borderColor: '#652D90',
                    borderRadius: wp(10),
                    color: '#000',
                    width: wp(42),
                    borderRadius: wp(5),
                    paddingLeft: wp(3),
                  }}
                  placeholderTextColor="black"
                  onChangeText={text => setRewardPoints(text)}
                  keyboardType="phone-pad"
                />
              </View>
            </>
          ) : null}
          <View
            style={{
              marginVertical: hp(2),
              height: hp(0.2),
              backgroundColor: '#AAAAAA',
              width: wp(90),
            }}></View>
          {/* {makePromise ? null : (
            <>
              <View style={styles.ToggelBox}>
                <Text style={Headings.Input3}>Reward Points</Text>
                <ToggleSwitch
                  isOn={rewardPointState}
                  style={{marginRight: wp(2)}}
                  onColor="#FFFFFF"
                  offColor="#FFFFFF"
                  thumbOffStyle={{backgroundColor: '#E4E4E4'}}
                  thumbOnStyle={{backgroundColor: '#652D90'}}
                  size="small"
                  onToggle={() => {
                    setRewardPointState(!rewardPointState);
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: hp(2),
                  height: hp(0.2),
                  backgroundColor: '#AAAAAA',
                  width: wp(90),
                }}></View>
              {rewardPointState ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: hp(5),
                    }}>
                    <TextInput
                      placeholder="0"
                      value={rewardPoints}
                      style={{
                        height: hp(5),
                        marginLeft: wp(18),
                        fontSize: hp(1.8),
                        borderWidth: hp(0.1),
                        width: wp(42),
                        borderRadius: wp(5),
                        paddingLeft: wp(3),
                      }}
                      onChangeText={text => setRewardPoints(text)}
                      keyboardType="phone-pad"
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: hp(2),
                      height: hp(0.2),
                      backgroundColor: '#AAAAAA',
                      width: wp(90),
                    }}></View>
                </>
              ) : null}
            </>
          )} */}
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
                  // console.log(!isRating, 'Changed');
                }}
              />

              {/* <Text style={Headings.Input3}>Guaranted $</Text> */}
              {/* <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}
            </View>
          </View>
          <View>
            {/* BCircel Box */}

            {/* Promise Statement  */}

            <View>
              <PromiseStatement onTextChange={handleTextChange} />
            </View>
          </View>
          {/* End  */}

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

          {/* </LinearGradient> */}
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
    // borderWidth: 1,
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
    // width: wp(30),
    // height: hp(4),
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
    // borderWidth: 1,
    width: wp(90),
    height: hp(7),
    // marginTop: wp(3),
  },
});

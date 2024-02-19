import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {
  MakeaPromise,
  promiseAmounnt,
  deadline,
  startDate,
  promiseStatement,
  promiseType,
  selectedPromisee,
  RewardPointsState,
  RewardPoints,
  RatingImapect,
} from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { Headings } from '../Styling/Headings';
import PromiseStatement from '../comp/makePromise/PromiseStatement';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commonStyles } from '../Styling/buttons';

const SnapPromiseVerification = ({ navigation }) => {
  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];

  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [deadlinedate, setDeadLinedate] = useRecoilState(startDate);
  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);

  const [fbtoggle, setFBTogel] = useState(false);
  const [Igtoggle, setIgTogel] = useState(false);
  const [xtoggle, setXTogel] = useState(false);
  const [financial, setFinancial] = useRecoilState(promiseType);
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);
  const [rewardPointState, setRewardPointState] =
    useRecoilState(RewardPointsState);
  const [rewardPoints, setRewardPoints] = useRecoilState(RewardPoints);
  const [isRating, setIsRating] = useRecoilState(RatingImapect);

  return (
    <View style={{ backgroundColor: '#E4EEE6', flex: 1, alignItems: 'center' }}>
      {/* Logo */}
      <View style={{ height: hp(30), height: hp(22) }}>
        <View style={styles.m}>
          <View style={styles.LogoC}>
            <Image
              source={require('../source/mainLogo.jpg')}
              style={styles.ImageStyle}
            />
          </View>
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: 'bold',
              color: 'black',
              marginTop: hp(1),
            }}>
            SNAP PROMISE
          </Text>
        </View>
      </View>

      {/* Verfication  */}
      <View>
        <LinearGradient
          colors={makePromise ? bgBtnmakeprms : bgBtnrqstprms}
          style={{
            width: wp(90),
            height: hp(60),
            marginTop: hp(4),
            borderRadius: wp(7),
            alignItems: 'center',
          }}>
          <View style={{ marginTop: hp(1.5) }}>
            {makePromise ? (
              <Text style={[Headings.h3ForReviewpage, { fontSize: 18 }]}>
                Your Promise has been sent to{' '}
              </Text>
            ) : (
              <Text>Your Promise request has been sent to </Text>
            )}
          </View>

          {/* <View style={styles.profilePic}> */}
          <Image
            source={
              Promiseze.imageURL === ''
                ? {
                  uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                }
                : { uri: Promiseze.imageURL }
            }
            // style={{
            //   width: wp(13),
            //   height: hp(6),
            //   borderRadius: wp(6.5), // Half of the width
            //   marginLeft: wp(2),
            //   marginTop: hp(1),
            // }}
            style={styles.profilePic}
          />
          {/* </View> */}
          <Text style={[Headings.h3ForReviewpage, { fontSize: 18 }]}>
            {Promiseze.firstName} {Promiseze.lastName}
          </Text>
          <Text
            style={[
              {
                textAlign: 'center',
                marginTop: hp(1.5),
                marginHorizontal: wp(4),
              },
              Headings.h3ForReviewpage,
            ]}>
            You will be notified when they accept or reject the promise
          </Text>

          <View>
            {amount ? (
              <View
                style={{
                  flexDirection: '',
                  alignItems: 'center',
                  marginVertical: hp(0.5),
                }}>
                <View>
                  {makePromise ? (
                    <Text
                      style={[
                        Headings.h3ForReviewpage, { fontSize: 18 }
                        // {marginVertical: hp(0.5)},
                      ]}>
                      Promise Amount{' '}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        Headings.h3ForReviewpage,
                        // {marginVertical: hp(0.5)},
                      ]}>
                      Promise Amount:{' '}
                    </Text>
                  )}
                </View>
                <View>
                  <Text
                    style={[Headings.h3ForReviewpage, { fontSize: 28 }]}>
                    $ {amount}.00
                  </Text>
                </View>
                {/* {rewardPoints ? (
                  <Text
                    style={[Headings.h3ForReviewpage, {}]}>
                    {' '} & {rewardPoints} Reward Points
                  </Text>
                ) : null} */}
              </View>
            ) : null}
          </View>

          {deadlinedate ? (
            <View
              style={{
                flexDirection: '',
                alignItems: 'center',
                marginVertical: hp(0.5),
              }}>
              <Text
                style={[Headings.h3ForReviewpage, { marginVertical: hp(0.5), fontSize: 18 }]}>
                Completion Date
              </Text>
              <Text style={Headings.h3ForReviewpage}> {deadlinedate}</Text>
            </View>
          ) : null}





          {isRating ?
            (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: hp(.5) }}>
                <Text style={[Headings.h3ForReviewpage, { marginVertical: hp(.5) }]}>Rating will impact</Text>
              </View>) : null
          }

          <Text style={[Headings.h3ForReviewpage, { fontSize: 18 }]}>Promise Statement</Text>
          <View style={{ height: hp(7), width: wp(80) }}>
            <View style={styles.generatedBox}>

              <Text
                style={[
                  {
                    textAlign: 'center',
                    // marginTop: hp(1.5),
                    color: '#FFFFFF',
                    fontSize: hp(1.8),
                    marginHorizontal: wp(4),
                  },
                ]}>
                {generatedTexts}
              </Text>

            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={[styles.btn, { marginTop: hp(2) }]}>
          <Text style={{ color: '#652D90' }}> View in Pending Promises</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreenB')}
          style={styles.btn}>
          <Text style={{ color: '#652D90' }}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SnapPromiseVerification;

const styles = StyleSheet.create({
  LogoC: {
    width: '100%',
    height: hp(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
  profilePic: {
    marginVertical: hp(1.5),
    width: wp(22),
    height: hp(11),
    // backgroundColor: '#888888',
    borderRadius: wp(11),
  },
  generatedBox: {
    width: '100%',
    borderColor: 'gray',
    height: hp(8),
    marginTop: hp(1.5),
  },
  generatedTextBox: {
    padding: hp(0.4),
  },
  generatedText: {
    fontSize: hp(1.5),
  },

  btn: {
    width: wp(90),
    backgroundColor: '#F6E2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(5),
    flexDirection: 'row',
    marginTop: hp(0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

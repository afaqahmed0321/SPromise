import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {
  MakeaPromise,
  promiseAmounnt,
  startDate,
  promiseStatement,
  promiseType,
  selectedPromisee,
  RewardPointsState,
  RewardPoints,
  RatingImapect,
  IsTimeBound,
  selectedMedia,
  selectMedia,
} from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { Headings } from '../Styling/Headings';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAw from 'react-native-vector-icons/FontAwesome6';

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
  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);
  const [attachMedia, setAttachMedia] = useRecoilState(selectedMedia);
  const [video, setVideo] = useRecoilState(selectMedia);



  const goToPending = () => {
    setMakePromise(true);
    setAmount('');
    setDeadLinedate('Select Date');
    setGeneratedTexts('');
    setFinancial(false);
    setSelectedPromisee({});
    setRewardPointState(false);
    setRewardPoints(null);
    setIsRating(false);
    setIsTimeB(false);
    setAttachMedia(null);
    navigation.navigate('Dashboard')
  }
  const goToHome = () => {
    setMakePromise(true);
    setAmount('');
    setDeadLinedate('Select Date');
    setGeneratedTexts('');
    setFinancial(false);
    setSelectedPromisee({});
    setRewardPointState(false);
    setRewardPoints(null);
    setIsRating(false);
    setIsTimeB(false);
    setAttachMedia(null);
    navigation.navigate('HomeScreenB')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  console.log("datttt", deadlinedate)
  return (
    <ScrollView>
    <View style={{ backgroundColor: '#E4EEE6', flex: 1, alignItems: 'center' , paddingBottom:wp(2)}}>
      <View style={{height: hp(17) }}>
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
              marginTop: hp(0),
            }}>
            SNAP PROMISE
          </Text>
        </View>
      </View>

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
              <Text style={[Headings.h3ForReviewpage, { fontSize: hp(1.8)  }]}>
                Your Promise has been sent to{' '}
              </Text>
            ) : (
              <Text style={{color:"white"}}>Your Promise request has been sent to </Text>
            )}
          </View>

          <Image
            source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}


            style={styles.profilePic}
          />
          <Text style={[Headings.h3ForReviewpage, { fontSize: hp(1.8)  }]}>
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
                        Headings.h3ForReviewpage, { fontSize: hp(1.8)  }
                      ]}>
                      Promise Amount{' '}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        Headings.h3ForReviewpage,
                      ]}>
                      Promise Amount:{' '}
                    </Text>
                  )}
                </View>
                <View>
                  <Text
                    style={[Headings.h3ForReviewpage, {fontSize: hp(1.6)  }]}>
                    $ {amount}.00
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          {rewardPoints > 0 && (
            <>
              <Text style={[Headings.h3ForReviewpage, { fontSize: hp(1.8) }]}>
                Reward Points
              </Text>
              <Text
                style={[Headings.h3ForReviewpage, { fontSize: hp(1.6)  }]}>
                {rewardPoints}
              </Text>
            </>
          )}
          {deadlinedate != 'Select Date' && deadlinedate != '' && deadlinedate != null ? (
            <View
              style={{
                flexDirection: '',
                alignItems: 'center',
                marginVertical: hp(0.5),
              }}>
              <Text
                style={[Headings.h3ForReviewpage, { marginVertical: hp(0.5), fontSize: hp(1.8)  }]}>
                Completion Date
              </Text>

              <Text style={Headings.h3ForReviewpage}>{formatDate(deadlinedate)}</Text>
            </View>
          ) : null}
          {isRating ?
            (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: hp(.5) }}>
                <Text style={[Headings.h3ForReviewpage, { marginVertical: hp(.5) }]}>Rating will impact</Text>
              </View>) : null
          }
          <Text style={[Headings.h3ForReviewpage, {fontSize: hp(1.8) , marginVertical:wp(1) }]}>Promise Statement</Text>
          <View style={{ height: hp(7), width: wp(80) }}>
            <View >
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: hp(1.8),
                    marginVertical: wp(0),
                  },
                ]}>
               {generatedTexts.length > 50 ? `${generatedTexts.slice(0, 50)}...` : generatedTexts}
              </Text>

            </View>

          </View>
          {/* {selectMedia != null && (
                <>
                 <View style={styles.Line}></View>
                <Text style={[Headings.h3ForReviewpage]}> Attached Media</Text>
            <FontAw name="youtube"  size={30} light style={{paddingHorizontal:hp(1)}} />
            </>
          )} */}
        </LinearGradient>
        <TouchableOpacity
          onPress={goToPending}
          style={[styles.btn, { marginTop: hp(2) }]}>
          <Text style={{ color: '#652D90' }}> View in Pending Promises</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToHome}
          style={styles.btn}>
          <Text style={{ color: '#652D90' }}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default SnapPromiseVerification;

const styles = StyleSheet.create({
  LogoC: {
    width: '100%',
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: hp(12),
    height: hp(12),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
  profilePic: {
    marginVertical: hp(1.5),
    width: wp(22),
    height: hp(11),
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
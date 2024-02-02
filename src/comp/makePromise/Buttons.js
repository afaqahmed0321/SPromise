import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RecoilState, useRecoilState} from 'recoil';
import {
  MakeaPromise,
  RewardPoints,
  deadline,
  promiseAmounnt,
  startDate,
} from '../../recoil/AddPromise';

const PromiseButtons = () => {
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [rewardPoints, setRewardPoints] = useRecoilState(RewardPoints);
  // const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);

  const makeprmsbg2 = ['#E4A936', '#EE8347'];
  const makeprmsbg1 = ['#EB6F1F', '#AA8F3C'];
  const rqstprmsbg2 = ['#73B6BF', '#2E888C'];
  const rqstprmsbg1 = ['#305B61', '#779A9C'];

  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [promidate, setPromidate] = useRecoilState(startDate);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: hp(5),
          // borderWidth:1
        }}>
        <TouchableOpacity
          onPress={() => {
            setMakePromise(true), setDeadLinedate(''), setPromidate('');
            setAmount(null), console.log('RewardPoints: ', rewardPoints, 'PromiseAmount: ', amount); 
          }}
          style={{width: '50%'}}>
          <LinearGradient
            colors={makePromise ? makeprmsbg1 : makeprmsbg2}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Make a Promise
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMakePromise(false), setDeadLinedate(''), setPromidate(''); setRewardPoints(null); setAmount(null), console.log('RewardPoints: ', rewardPoints, 'PromiseAmount: ', amount); 
          }}
          style={{width: '50%'}}>
          <LinearGradient
            colors={makePromise ? rqstprmsbg2 : rqstprmsbg1}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Request a Promise
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromiseButtons;

const styles = StyleSheet.create({});

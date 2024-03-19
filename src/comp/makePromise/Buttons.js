import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRecoilState} from 'recoil';
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
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [promidate, setPromidate] = useRecoilState(startDate);

  useEffect(() => {
    if (!makePromise) {
      setDeadLinedate('');
      setPromidate('');
      setRewardPoints(null);
      setAmount(null);
    }
  }, [makePromise]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: hp(5),
        }}>
        <TouchableOpacity
          onPress={() => {
            setMakePromise(true);
          }}
          style={{width: '50%'}}>
          <LinearGradient
            colors={makePromise ? ['#EB6F1F', '#AA8F3C'] : ['#E4A936', '#EE8347']}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Make a Promise
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMakePromise(false);
          }}
          style={{width: '50%'}}>
          <LinearGradient
            colors={makePromise ? ['#73B6BF', '#2E888C'] : ['#305B61', '#779A9C']}
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

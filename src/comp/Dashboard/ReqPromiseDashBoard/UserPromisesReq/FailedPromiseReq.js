import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import GetUserPromiseRequest from '../../../../Network/Dashboard/PromiseReq/GetUserPromiseReq';
import { UserNo, selectedVideoR } from '../../../../recoil/AddPromise';
import { RefreshControl } from 'react-native';
import MiniCard from '../../../Global/MiniCard';
import DetailCard from '../../../Global/DetailCard';

const FailedPromiseReq = ({ navigation }) => {

  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [promises, setPromises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userN, setUserN] = useRecoilState(UserNo);
  const focus = useIsFocused();
  const [refersh, setrefresh] = useState(false);
  const [showDetail, setshowDetail] = useState('');

  const onRefresh = () => {
    setrefresh(!refersh);
  };

  useEffect(() => {
    GetUserPromiseRequest(userN)
      .then(data => {
        setPromises(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
  }, [focus, refersh]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E4EEE6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={['#E4A936', '#EE8347']} // Android
              tintColor="white" // iOS
              title="Refreshing..." // iOS
              titleColor="white" // iOS
            />
          }
          data={promises.filter(item => item.status === "Rejected")}
          keyExtractor={item => item.promiseID.toString()} // Use a unique identifier as the key
          renderItem={({ item }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {showDetail == item.promiseID ? (
                <TouchableOpacity onPress={() => setshowDetail('')}>
                  <DetailCard
                    promiseeProfileImageUrl={item?.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    amount={item.paymentAmount}
                    name={item.promiseeName}
                    date={item.expiryDate}
                                        promiseMediaURL={item?.promiseMediaURL ? item?.promiseMediaURL : null}

                    ratingImpact={item.ratingImpact}
                    promiseGoal={item.promiseGoal}
                    actions={item.actions}
                    promiseID={item.promiseID}
                    refreshCallback={onRefresh}
                    userN={userN}
                    tab={'UserPromiseReq'}
                    guaranteedWithMoney={item.guaranteedWithMoney}
                    alotRewardPoints={item.alotRewardPoints}
                    rewardPoints={item.rewardPoints}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setshowDetail(item.promiseID)}>
                  <MiniCard
                    promiseeProfileImageUrl={item?.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    rewardPoints={item.rewardPoints}
                    amount={item.paymentAmount}
                    name={item.promiseeName}
                    date={item.expiryDate}
                                        promiseMediaURL={item?.promiseMediaURL ? item?.promiseMediaURL : null}

                    tab={'UserPromiseReq'}
                    guaranteedWithMoney={item.guaranteedWithMoney}
                  />
                </TouchableOpacity>
              )}
            </View>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(90),
    // borderWidth: wp(0.3),
    height: hp(40),
    flexDirection: 'row',
  },
  bar: {
    height: hp(3),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barText: {
    fontSize: hp(1.5),
    marginLeft: wp(1.5),
    marginRight: wp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
  },
  DataSection: {
    width: wp(48),
    height: hp(40),
    backgroundColor: '#DDDFE2',
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    borderTopWidth: wp(0.6),
    borderColor: '#652D90',
  },

  states: {
    width: wp(39),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(42),
    height: hp(21),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {
    width: wp(90),
    height: hp(23),
    marginTop: hp(0.7),
    borderRadius: wp(5),
    alignItems: 'center',
  },
  btn: {
    width: wp(35),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FailedPromiseReq;

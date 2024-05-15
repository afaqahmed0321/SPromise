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
import GetPromiseRequestToUser from '../../../../Network/Dashboard/PromiseReq/GetPromiseReqToUser';
import {
  EditPromiseReq,
  IsTimeBound,
  MakeaPromise,
  PaymentCheck,
  RewardCheck,
  UserNo,
  deadline,
  isEndDateModalV,
  isStartDateModalV,
  istimeBoundCheckBox1,
  istimeBoundCheckBox2,
  promiseAmounnt,
  promiseReward,
  promiseStatement,
  selectMedia,
  selectedPromisee,
  selectedReqPromiseId,
  selectedVideoR,
  startDate,
  upDatePromiseReq,
} from '../../../../recoil/AddPromise';
import { RefreshControl } from 'react-native';
import MiniCard from '../../../Global/MiniCard';
import DetailCard from '../../../Global/DetailCard';

const ShowAllTabPRTM = ({ navigation }) => {
  const [selectedMedia, setSelectedMedia] = useRecoilState(selectMedia);

  const [amount, setAmount] = useRecoilState(promiseAmounnt);
  const [isTimeB, setIsTimeB] = useRecoilState(IsTimeBound);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(startDate);
  const [paymentCheck, setpaymentCheck] = useRecoilState(PaymentCheck);
  const [rewardCheck, setrewardCheck] = useRecoilState(RewardCheck);
  const [preward, setPreward] = useRecoilState(promiseReward);
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const [startDateMV, setStartDateMV] = useRecoilState(isStartDateModalV);
  const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV);
  const [Promiseze, setSelectedPromisee] = useRecoilState(selectedPromisee);
  const [selectedReqPromiseID, setSelectedReqPromiseID] = useRecoilState(selectedReqPromiseId);
  const [editPromiseReq, setEditPromiseReq] = useRecoilState(EditPromiseReq);

  const [isChecked1, setIsChecked1] = useState(istimeBoundCheckBox1);
  const [isChecked2, setIsChecked2] = useState(istimeBoundCheckBox2);

  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);
  // const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);

  const onRefresh = () => {
    setrefresh(!refersh);
  };

  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [editPReq, setEditPReq] = useRecoilState(upDatePromiseReq);
  const [promises, setPromises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [refersh, setrefresh] = useState(false);
  const focus = useIsFocused();
  const [showDetail, setshowDetail] = useState('');

  useEffect(() => {
    GetPromiseRequestToUser(userN)
      .then(data => {
        setPromises(data);
        console.log(data, "pro")
        setIsLoading(false);
        console.log("REQ TO ME ALL DATA", data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
    return () => {
      setPromises([]);
    };
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
          data={promises}
          keyExtractor={item => item.promiseID.toString()} // Use a unique identifier as the key
          renderItem={({ item }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {showDetail == item.promiseID ? (
                <TouchableOpacity onPress={() => setshowDetail('')}>
                  <DetailCard
                    promiseeProfileImageUrl={item?.promiseeProfileImageUrl}
                    isTimeBound={item?.isTimeBound}
                    displayStatus = {item?.displayStatus}

                    promisetype={item.promiseType}
                    amount={item.paymentAmount}
                    name={item.promisorName}
                    date={item.expiryDate}
                    promiseMediaURL={item?.promiseMediaURL ? item?.promiseMediaURL : null}
                    promisorName={item.promisorName}
                    promiseeName={item?.promiseeName}

                    ratingImpact={item.ratingImpact}
                    promiseGoal={item.promiseGoal}
                    actions={item.actions}
                    promiseID={item.promiseID}
                    refreshCallback={onRefresh}
                    userN={userN}
                    tab={'ReqPromiseDashboard'}
                    guaranteedWithMoney={item.guaranteedWithMoney}
                    alotRewardPoints={item.alotRewardPoints}
                    rewardPoints={item.rewardPoints}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setshowDetail(item.promiseID)}>
                  <MiniCard
                    promiseeProfileImageUrl={item?.promiseeProfileImageUrl}
                    isTimeBound={item?.isTimeBound}

                    promisetype={item.promiseType}
                    rewardPoints={item.rewardPoints}
                    amount={item.paymentAmount}
                    name={item.promisorName}
                    date={item.expiryDate}
                    promiseMediaURL={item?.promiseMediaURL ? item?.promiseMediaURL : null}
                    tab={'ReqPromiseDashboard'}
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
  Card: {},
  btn: {
    width: wp(20),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowAllTabPRTM;

import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
// import {Headings} from '../../../Styling/Headings';

import {useRecoilState} from 'recoil';
// import { UserNo } from '../../../recoil/AddPromise';
import {useIsFocused} from '@react-navigation/native';
import GetPromiseRequestToUser from '../../../../Network/Dashboard/PromiseReq/GetPromiseReqToUser';
import {Headings} from '../../../../Styling/Headings';
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
import {commonStyles} from '../../../../Styling/buttons';
import {handleAccept, handleReject} from '../Action';
import {DashBoardStyling} from '../../../../Styling/DashBoard';
import {RefreshControl} from 'react-native';
import MiniCard from '../../../Global/MiniCard';
import DetailCard from '../../../Global/DetailCard';

const ShowAllTabPRTM = ({navigation}) => {
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
  const [selectedReqPromiseID, setSelectedReqPromiseID] =
    useRecoilState(selectedReqPromiseId);
  const [editPromiseReq, setEditPromiseReq] = useRecoilState(EditPromiseReq);

  const [isChecked1, setIsChecked1] = useState(istimeBoundCheckBox1);
  const [isChecked2, setIsChecked2] = useState(istimeBoundCheckBox2);

  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);
  // const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);

  const onRefresh = () => {
    setrefresh(!refersh);
  };
  const handelAttachedMedia = urll => {
    console.log(urll);
    setSelectedVideo(urll);
    navigation.navigate('Player');
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
    // Fetch data from the API using MyPromisesApi
    GetPromiseRequestToUser(userN)
      .then(data => {
        setPromises(data);
        setIsLoading(false);
        // console.log(data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
    return () => {
      setPromises([]);
    };
    // }, [focus]);
  }, [focus, refersh]);

  return (
    // <View style={{flex: 1, backgroundColor: '#E4EEE6'}}>
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
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {showDetail == item.promiseID ? (
                <TouchableOpacity onPress={() => setshowDetail('')}>
                  <DetailCard
                    promiseeProfileImageUrl={item.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    amount={item.paymentAmount}
                    name={item.promisorName}
                    date={item.expiryDate}
                    promiseMediaURL={item.promiseMediaURL}
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
                    promiseeProfileImageUrl={item.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    rewardPoints={item.rewardPoints}
                    amount={item.paymentAmount}
                    name={item.promisorName}
                    date={item.expiryDate}
                    promiseMediaURL={item.promiseMediaURL}
                    tab={'ReqPromiseDashboard'}
                    guaranteedWithMoney={item.guaranteedWithMoney}
                  />
                </TouchableOpacity>
              )}
            </View>
            // <View style={{justifyContent: 'center', alignItems: 'center'}}>
            //   <LinearGradient
            //     colors={['#73B6BF', '#2E888C']}
            //     style={DashBoardStyling.MainCard}>
            //     <View
            //       style={{
            //         // width: wp(90),
            //         // height: hp(23),
            //         alignItems: 'center',
            //         // borderWidth:1
            //       }}>
            //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //         <View
            //           style={{
            //             width: wp(13),
            //             height: hp(6),
            //             borderRadius: wp(6.5), // Half of the width
            //             marginLeft: wp(2),
            //             marginTop: hp(1),
            //           }}>
            //           <Image
            //             source={
            //               item.promiseeProfileImageUrl === ''
            //                 ? {
            //                     uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
            //                   }
            //                 : {uri: item.promiseeProfileImageUrl}
            //             }
            //             style={{
            //               width: wp(13),
            //               height: hp(6),
            //               borderRadius: wp(6.5), // Half of the width
            //             }}
            //           />
            //         </View>
            //         <View
            //           style={{
            //             marginLeft: wp(3),
            //             width: wp(45),
            //           }}>
            //           <Text style={{color: 'white', fontSize: hp(2)}}>
            //             {item.promiseeName}
            //           </Text>
            //         </View>
            //         <View style={{width: wp(8)}}>
            //           <Entypo size={25} color="white" name="calendar" />
            //         </View>

            //         <View style={{width: wp(15)}}>
            //           <Text
            //             style={[
            //               Headings.Input5,
            //               {
            //                 marginLeft: wp(0.1),
            //                 color: 'white',
            //                 marginTop: wp(0.3),
            //               },
            //             ]}>
            //             DeadLine
            //           </Text>
            //           <Text
            //             style={[
            //               Headings.Input6,
            //               {
            //                 marginLeft: wp(0.1),
            //                 color: 'white',
            //                 marginTop: wp(0.3),
            //               },
            //             ]}>
            //             {format(new Date(item.expiryDate), 'dd/MM/yyyy')}
            //           </Text>
            //         </View>
            //       </View>
            //       <View style={DashBoardStyling.PromiseGoal}>
            //         <View>
            //           <Text
            //             style={[
            //               Headings.Input5,
            //               {color: 'white', textAlign: 'center'},
            //             ]}>
            //             {item.promiseGoal}
            //           </Text>
            //         </View>
            //       </View>
            //       {/* <View
            //         style={DashBoardStyling.PromiseReward}>
            //         {item.promiseType == 'Payment' ? (
            //           <Text
            //             style={[
            //               {
            //                 color: 'white',
            //                 fontWeight: 'bold',
            //                 fontSize: hp(2.3),
            //               },
            //             ]}>
            //             Amount:$ {item.paymentAmount}
            //           </Text>
            //         ) : (
            //           <Text
            //             style={[
            //               {
            //                 color: 'white',
            //                 fontWeight: 'bold',
            //                 fontSize: hp(2.3),
            //               },
            //             ]}>
            //             Reward: +20XP
            //           </Text>
            //         )}
            //         {item.promiseMediaURL ? (
            //           <TouchableOpacity
            //             onPress={() =>
            //               handelAttachedMedia(item.promiseMediaURL)
            //             }>
            //             <Text style={{color: 'blue'}}>Attached File</Text>
            //           </TouchableOpacity>
            //         ) : null}
            //       </View> */}
            //        <View style={{
            //           // borderWidth: wp(0.1),
            //           height: hp(3.5),
            //           width: wp(80),
            //           justifyContent: 'center',
            //           alignItems: 'center',
            //         }}>
            //           {item.guaranteedWithMoney ? (
            //             <Text
            //               style={[
            //                 {
            //                   color: 'white',
            //                   fontWeight: 'bold',
            //                   fontSize: hp(2.3),
            //                 },
            //               ]}>
            //               Commitment: ${item.paymentAmount}
            //             </Text>
            //           ) : null
            //           // <Text
            //           //   style={[
            //           //     {
            //           //       color: 'white',
            //           //       fontWeight: 'bold',
            //           //       fontSize: hp(2.3),
            //           //     },
            //           //   ]}>
            //           //   Reward: +20XP
            //           // </Text>
            //           }
            //         </View>
            //         <View
            //           style={{
            //             // borderWidth: wp(0.1),
            //             height: hp(3.5),
            //             width: wp(80),
            //             justifyContent: 'center',
            //             alignItems: 'center',
            //           }}>
            //           {item.alotRewardPoints ? (
            //             <Text
            //               style={[
            //                 {
            //                   color: 'white',
            //                   fontWeight: 'bold',
            //                   fontSize: hp(2.3),
            //                 },
            //               ]}>
            //               {item.rewardPoints} Reward points will be given
            //             </Text>
            //           ) : null
            //           // <Text
            //           //   style={[
            //           //     {
            //           //       color: 'white',
            //           //       fontWeight: 'bold',
            //           //       fontSize: hp(2.3),
            //           //     },
            //           //   ]}>
            //           //   Reward: +20XP
            //           // </Text>
            //           }
            //         </View>
            //         {item.ratingImpact ?(<View style={{width: wp(40)}}>
            //           <Text
            //             style={[
            //               Headings.Input5,
            //               {
            //                 marginLeft: wp(0.7),
            //                 color: 'white',
            //                 marginTop: wp(0.3),
            //                 color: 'white',
            //                 fontWeight: 'bold',
            //                 fontSize: hp(2.3),
            //               },
            //             ]}>
            //             Rating will impact
            //           </Text>
            //         </View>) :null}
            //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //         <View
            //           style={{
            //             flexDirection: 'row',
            //             justifyContent: 'space-between',
            //             marginTop: hp(1),
            //             width: wp(70),
            //             // borderWidth: 1,

            //           }}>
            //           {/* <TouchableOpacity style={styles.btn}>
            //               {item.status=="Pending"?
            //               <Text>Accept</Text>:
            //               <Text>Mark Completed</Text> }
            //               </TouchableOpacity>
            //               <TouchableOpacity style={[styles.btn, {backgroundColor:'#E32E2E'}]}>
            //               {item.status=="Pending"?
            //               <Text>Reject</Text>:
            //               <Text>Mark Failed</Text>}
            //               </TouchableOpacity> */}
            //           {item.actions.map((action, index) => {
            //             if (action === 'Accept') {
            //               return (
            //                 <TouchableOpacity
            //                   style={commonStyles.ActionBtn}
            //                   key={index}
            //                   onPress={() =>
            //                     {handleAccept(item.promiseID, userN)
            //                       setrefresh(!refersh)

            //                     }
            //                   }>
            //                   <Text>{action}</Text>
            //                 </TouchableOpacity>
            //               );
            //             } else if (action === 'Reject') {
            //               return (
            //                 <TouchableOpacity
            //                   style={[
            //                     commonStyles.ActionBtn,
            //                     {backgroundColor: 'red'},
            //                   ]}
            //                   key={index}
            //                   onPress={() =>

            //                     {
            //                       const promiseIDD = item.promiseID
            //                       handleReject(promiseIDD, userN)
            //                       setrefresh(!refersh);
            //                     }
            //                   }>
            //                   <Text>{action}</Text>
            //                 </TouchableOpacity>
            //               );
            //             }
            //           })}
            //         </View>
            //         {/* <TouchableOpacity
            //           onPress={() => {
            //             setEditPReq(item);
            //             console.log('Hiiii', item);
            //             {
            //               item.promiseType == 'Payment'
            //                 ? (setrewardCheck(false),
            //                   setpaymentCheck(true),
            //                   setAmount(item.paymentAmount))
            //                 : (setrewardCheck(true),
            //                   setpaymentCheck(false),
            //                   setPreward('+20XP'));
            //             }
            //             {
            //               item.isTimeBound
            //                 ? (setIsTimeB(true),
            //                   setIsChecked2(true),
            //                   setIsChecked1(false),
            //                   setDeadLinedate(
            //                     format(new Date(item.expiryDate), 'dd-MM-yyyy'),
            //                   ),
            //                   setStartDate(
            //                     format(new Date(item.startDate), 'dd-MM-yyyy'),
            //                   ))
            //                 : (setIsTimeB(false),
            //                   setIsChecked2(false),
            //                   setIsChecked1(true));
            //             }
            //             setSelectedReqPromiseID(item.promiseID);
            //             setGeneratedTexts(item.promiseGoal);
            //             setSelectedMedia(item.promiseMediaURL);
            //             setEditPromiseReq(true);
            //             // setSelectedPromisee.networkUserNo(item.promisee)
            //             // setSelectedPromisee.networkUserName(item.promiseeName)
            //             setSelectedPromisee({
            //               networkUserName: item.promiseeName,
            //               networkUserNo: item.promisee,
            //               imageURL: item.promiseeProfileImageUrl,
            //             });
            //             console.log(Promiseze);
            //             navigation.navigate('MakePromise');
            //             // setAmount(item.)
            //           }}
            //           style={{marginLeft: wp(2)}}>
            //           <Feather color="white" name="edit-2" size={17} />
            //         </TouchableOpacity> */}
            //       </View>
            //     </View>
            //   </LinearGradient>
            // </View>
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
    // borderWidth: wp(0.3),
    height: hp(40),
    // borderRadius: wp(4),
    backgroundColor: '#DDDFE2',
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    borderTopWidth: wp(0.6),
    borderColor: '#652D90',
  },

  states: {
    width: wp(39),
    // borderWidth: wp(0.3),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(42),
    // borderWidth: wp(0.3),
    height: hp(21),
    // borderColor: 'red',
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {},
  btn: {
    // width: wp(35),
    width: wp(20),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowAllTabPRTM;

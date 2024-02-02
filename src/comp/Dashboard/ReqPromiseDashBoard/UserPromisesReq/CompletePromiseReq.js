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
import {useRecoilState} from 'recoil';
import {useIsFocused} from '@react-navigation/native';
import GetUserPromiseRequest from '../../../../Network/Dashboard/PromiseReq/GetUserPromiseReq';
import {UserNo, selectedVideoR} from '../../../../recoil/AddPromise';
import {Headings} from '../../../../Styling/Headings';
import {commonStyles} from '../../../../Styling/buttons';
import {DashBoardStyling} from '../../../../Styling/DashBoard';
import {RefreshControl} from 'react-native';
import DetailCard from '../../../Global/DetailCard';
import MiniCard from '../../../Global/MiniCard';

const CompletePromiseReq = ({navigation}) => {
  const handelAttachedMedia = urll => {
    console.log(urll);
    setSelectedVideo(urll);
    navigation.navigate('Player');
  };
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
    // }, [focus]);
  }, [focus, refersh]);

  return (
    // <View style={{flex: 1, backgroundColor: '#DEFFD6'}}>
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
          data={promises.filter(item => item.status === 'Completed')}
          keyExtractor={item => item.promiseID.toString()} // Use a unique identifier as the key
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {showDetail == item.promiseID ? (
                <TouchableOpacity onPress={() => setshowDetail('')}>
                  <DetailCard
                    promiseeProfileImageUrl={item.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    amount={item.paymentAmount}
                    name={item.promiseeName}
                    date={item.expiryDate}
                    promiseMediaURL={item.promiseMediaURL}
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
                    promiseeProfileImageUrl={item.promiseeProfileImageUrl}
                    promisetype={item.promiseType}
                    rewardPoints={item.rewardPoints}
                    amount={item.paymentAmount}
                    name={item.promiseeName}
                    date={item.expiryDate}
                    promiseMediaURL={item.promiseMediaURL}
                    tab={'UserPromiseReq'}
                    guaranteedWithMoney={item.guaranteedWithMoney}
                  />
                </TouchableOpacity>
              )}
            </View>
            //     <View style={{justifyContent: 'center', alignItems: 'center'}}>
            //     <LinearGradient
            //       colors={['#E4A936', '#EE8347']}
            //       style={DashBoardStyling.MainCard}>
            //       <View
            //         style={{
            //           // width: wp(90),
            //           // height: hp(23),
            //           alignItems: 'center',
            //           // borderWidth:1
            //         }}>
            //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //           {/* <View
            //             style={{
            //               width: wp(12),
            //               height: hp(6),
            //               backgroundColor: 'grey',
            //               marginTop: hp(0.5),
            //               borderRadius: wp(12),
            //             }}></View> */}
            //           <View
            //             style={{
            //               width: wp(13),
            //               height: hp(6),
            //               borderRadius: wp(6.5), // Half of the width
            //               marginLeft: wp(2),
            //               marginTop: hp(1),
            //             }}>
            //             <Image
            //               source={
            //                 item.promisorProfileImageUrl === ''
            //                   ? {
            //                       uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
            //                     }
            //                   : {uri: item.promisorProfileImageUrl}
            //               }
            //               style={{
            //                 width: wp(13),
            //                 height: hp(6),
            //                 borderRadius: wp(6.5),
            //               }}
            //             />
            //           </View>
            //           <View style={{marginLeft: wp(3), width: wp(45)}}>
            //             <Text style={{color: 'white', fontSize: hp(2)}}>
            //               {item.promisorName}
            //             </Text>
            //           </View>
            //           <View style={{width: wp(8)}}>
            //             <Entypo size={25} color="white" name="calendar" />
            //           </View>

            //           <View style={{width: wp(15)}}>
            //             <Text
            //               style={[
            //                 Headings.Input5,
            //                 {
            //                   marginLeft: wp(0.7),
            //                   color: 'white',
            //                   marginTop: wp(0.3),
            //                 },
            //               ]}>
            //               DeadLine
            //             </Text>
            //             <Text
            //               style={[
            //                 Headings.Input6,
            //                 {
            //                   marginLeft: wp(0.7),
            //                   color: 'white',
            //                   marginTop: wp(0.3),
            //                 },
            //               ]}>
            //               {format(new Date(item.expiryDate), 'dd/MM/yyyy')}
            //             </Text>
            //           </View>
            //         </View>
            //         <View style={DashBoardStyling.PromiseGoal}>
            //           {/* <View style={{width: '100%', height: hp(6)}}> */}
            //           <View>
            //             <Text
            //               style={[
            //                 Headings.Input5,
            //                 {color: 'white', textAlign: 'center'},
            //               ]}>
            //               {item.promiseGoal}
            //             </Text>
            //           </View>
            //         </View>
            //         <View style={DashBoardStyling.PromiseReward}>
            //           <View style={{
            //             // borderWidth: wp(0.1),
            //             height: hp(3.5),
            //             width: wp(80),
            //             justifyContent: 'center',
            //             alignItems: 'center',
            //           }}>
            //             {item.guaranteedWithMoney ? (
            //               <Text
            //                 style={[
            //                   {
            //                     color: 'white',
            //                     fontWeight: 'bold',
            //                     fontSize: hp(2.3),
            //                   },
            //                 ]}>
            //                 Commitment: ${item.paymentAmount}
            //               </Text>
            //             ) : null
            //             // <Text
            //             //   style={[
            //             //     {
            //             //       color: 'white',
            //             //       fontWeight: 'bold',
            //             //       fontSize: hp(2.3),
            //             //     },
            //             //   ]}>
            //             //   Reward: +20XP
            //             // </Text>
            //             }
            //           </View>
            //           <View
            //             style={{
            //               // borderWidth: wp(0.1),
            //               height: hp(3.5),
            //               width: wp(80),
            //               justifyContent: 'center',
            //               alignItems: 'center',
            //             }}>
            //             {item.alotRewardPoints ? (
            //               <Text
            //                 style={[
            //                   {
            //                     color: 'white',
            //                     fontWeight: 'bold',
            //                     fontSize: hp(2.3),
            //                   },
            //                 ]}>
            //                 {item.rewardPoints} Reward points will be given
            //               </Text>
            //             ) : null
            //             // <Text
            //             //   style={[
            //             //     {
            //             //       color: 'white',
            //             //       fontWeight: 'bold',
            //             //       fontSize: hp(2.3),
            //             //     },
            //             //   ]}>
            //             //   Reward: +20XP
            //             // </Text>
            //             }
            //           </View>
            //           {item.ratingImpact ?(<View style={{width: wp(40)}}>
            //             <Text
            //               style={[
            //                 Headings.Input5,
            //                 {
            //                   marginLeft: wp(0.7),
            //                   color: 'white',
            //                   marginTop: wp(0.3),
            //                   color: 'white',
            //                   fontWeight: 'bold',
            //                   fontSize: hp(2.3),
            //                 },
            //               ]}>
            //               Rating will impact
            //             </Text>
            //           </View>) :null}
            //           {item.promiseMediaURL ? (
            //             <TouchableOpacity
            //               onPress={() =>
            //                 handelAttachedMedia(item.promiseMediaURL)
            //               }>
            //               <Text style={{color: 'blue'}}>Attached File</Text>
            //             </TouchableOpacity>
            //           ) : null}
            //         </View>
            //         <View
            //           style={{
            //             flexDirection: 'row',
            //             justifyContent: 'space-around',
            //             marginTop: hp(1),
            //           }}>
            //           {/* <TouchableOpacity style={styles.btn}>
            //                   {item.status=="Pending"?
            //                 <Text>Accept</Text>:
            //                 <Text>Mark Completed</Text>
            // }
            //                 </TouchableOpacity>
            //                 <TouchableOpacity style={[styles.btn, {backgroundColor:'#E32E2E'}]}>
            //                 {item.status=="Pending"?
            //                 <Text>Reject</Text>:
            //                 <Text>Mark Failed</Text>
            //                  }
            //   </TouchableOpacity> */}
            //           {item.actions.map((action, index) => (
            //             <TouchableOpacity
            //               style={commonStyles.ActionBtn}
            //               key={index}
            //               onPress={() => console.log(action)}>
            //               <Text>{action}</Text>
            //             </TouchableOpacity>
            //           ))}
            //         </View>
            //       </View>
            //     </LinearGradient>
            //   </View>
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
  Card: {
    width: wp(90),
    // borderWidth: wp(0.5),
    height: hp(23),
    // borderWidth: wp(0.5),
    marginTop: hp(0.7),
    // marginLeft: hp(0.8),
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

export default CompletePromiseReq;

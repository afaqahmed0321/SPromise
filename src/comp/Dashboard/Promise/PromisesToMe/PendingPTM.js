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
import MyPromisesApi from '../../../../Network/Dashboard/Promises/MyPromisesApi/MyPromisesApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Headings} from '../../../../Styling/Headings';
import {useRecoilState} from 'recoil';
import {UserNo, selectedVideoR} from '../../../../recoil/AddPromise';
import PromisesToMeApi from '../../../../Network/Dashboard/Promises/PromisesToMeApi/PromisesToMeApi';
import {useIsFocused} from '@react-navigation/native';
import {commonStyles} from '../../../../Styling/buttons';
import {
  handleAcceptPromise,
  handleCompletePromise,
  handleFailPromise,
  handleRejectPromise,
} from '../PromiseAction';
import {DashBoardStyling} from '../../../../Styling/DashBoard';
import {RefreshControl} from 'react-native';
import MiniCard from '../../../Global/MiniCard';
import DetailCard from '../../../Global/DetailCard';

const PendingPTM = ({navigation}) => {
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
    // Fetch data from the API using MyPromisesApi
    PromisesToMeApi(userN)
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
    // <View style={{flex: 1, backgroundColor: '#FFE4BB'}}>
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
          data={promises.filter(item => item.status === 'Pending')}
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
                    rewardPoints={item.rewardPoints}
                    userN={userN}
                    tab={'PromisestoMe'}
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
                    tab={'PromisestoMe'}
                  />
                </TouchableOpacity>
              )}
            </View>
            // <View style={{justifyContent: 'center', alignItems: 'center'}}>
            //   <LinearGradient
            //     colors={['#73B6BF', '#2E888C']}
            //     style={
            //       DashBoardStyling.MainCard
            //     //   {
            //     //   width: wp(90),
            //     //   height: hp(25),
            //     //   marginTop: hp(0.7),
            //     //   borderRadius: wp(5),
            //     //   alignItems: 'center',
            //     // }
            //     }>
            //     <View
            //       style={{
            //         width: wp(90),
            //         height: hp(25),
            //         alignItems: 'center',
            //       }}>
            //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //         {/* <View
            //         style={{
            //           width: wp(12),
            //           height: hp(6),
            //           backgroundColor: 'grey',
            //           marginTop: hp(0.5),
            //           borderRadius: wp(12),

            //         }}></View> */}
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
            //               item.promisorProfileImageUrl === ''
            //                 ? {
            //                     uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
            //                   }
            //                 : {uri: item.promisorProfileImageUrl}
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
            //             {item.promisorName}
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
            //                 marginLeft: wp(0.7),
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
            //                 marginLeft: wp(0.7),
            //                 color: 'white',
            //                 marginTop: wp(0.3),
            //               },
            //             ]}>
            //             {format(new Date(item.expiryDate), 'dd/MM/yyyy')}
            //           </Text>
            //         </View>
            //       </View>
            //       <View style={
            //         // {width: wp(70), height: hp(6)}
            //         DashBoardStyling.PromiseGoal
            //         }>
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
            //       <View
            //         style={
            //           DashBoardStyling.PromiseReward
            //         //   {
            //         //   justifyContent: 'center',
            //         //   alignItems: 'center',
            //         // }
            //         }>
            //         {item.paymentAmount == '0' ? (
            //           <Text
            //             style={[
            //               {
            //                 color: 'white',
            //                 fontWeight: 'bold',
            //                 fontSize: hp(2.3),
            //               },
            //             ]}>
            //             Guarantee: {item.paymentAmount}$
            //           </Text>
            //         ) : (null
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
            //         )}
            //         {item.promiseMediaURL ? (
            //           <TouchableOpacity
            //             onPress={() =>
            //               handelAttachedMedia(item.promiseMediaURL)
            //             }>
            //             <Text style={{color: 'blue'}}>Attached File</Text>
            //           </TouchableOpacity>
            //         ) : null}
            //       </View>

            //       {item.ratingImpact ?(<View style={{width: wp(40)}}>
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
            //       <View
            //         style={{
            //           flexDirection: 'row',
            //           justifyContent: 'space-around',

            //           marginTop: hp(1),
            //           width: wp(90),
            //         }}>
            //         {item.actions.map((action, index) => {
            //           if (action === 'Accept') {
            //             return (
            //               <TouchableOpacity
            //                 style={commonStyles.ActionBtn}
            //                 key={index}
            //                 onPress={() => {
            //                   handleAcceptPromise(item.promiseID, userN);
            //                   setrefresh(!refersh);
            //                 }}>
            //                 <Text>{action}</Text>
            //               </TouchableOpacity>
            //             );
            //           } else if (action === 'Reject') {
            //             return (
            //               <TouchableOpacity
            //                 style={[
            //                   commonStyles.ActionBtn,
            //                   {backgroundColor: 'red'},
            //                 ]}
            //                 key={index}
            //                 onPress={() => {
            //                   handleRejectPromise(item.promiseID, userN);
            //                   setrefresh(!refersh);
            //                 }}>
            //                 <Text>{action}</Text>
            //               </TouchableOpacity>
            //             );
            //           } else if (action === 'Complete') {
            //             return (
            //               <TouchableOpacity
            //                 style={[commonStyles.ActionBtn]}
            //                 key={index}
            //                 onPress={() => {
            //                   handleCompletePromise(item.promiseID, userN);
            //                   setrefresh(!refersh);
            //                 }}>
            //                 <Text>{action}</Text>
            //               </TouchableOpacity>
            //             );
            //           } else if (action === 'Fail') {
            //             return (
            //               <TouchableOpacity
            //                 style={[
            //                   commonStyles.ActionBtn,
            //                   {backgroundColor: 'red'},
            //                 ]}
            //                 key={index}
            //                 onPress={() => {
            //                   handleFailPromise(item.promiseID, userN);
            //                   setrefresh(!refersh);
            //                 }}>
            //                 <Text>{action}</Text>
            //               </TouchableOpacity>
            //             );
            //           }
            //         })}
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

export default PendingPTM;

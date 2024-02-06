import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DashBoardStyling} from '../../Styling/DashBoard';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {Headings} from '../../Styling/Headings';
import {format} from 'date-fns';

const MiniCard = ({
  promiseeProfileImageUrl,
  promisetype,
  amount,
  name,
  date,
  promiseMediaURL,
  tab,
  guaranteedWithMoney,
  rewardPoints,
}) => {
  return (
    <>
      {tab == 'UserPromiseReq' || tab == 'ReqPromiseDashboard' ? (
        <LinearGradient
          colors={
            tab == 'UserPromiseReq'
              ? ['#E4A936', '#EE8347']
              : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MiniCard}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
              {/* <View
             style={{
               width: wp(12),
               height: hp(6),
               backgroundColor: 'grey',
               marginTop: hp(0.5),
               borderRadius: wp(12),
               
             }}></View> */}
              <View
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5), // Half of the width
                  marginLeft: wp(2),
                  marginTop: hp(1),
                }}>
                <Image
                  source={
                    promiseeProfileImageUrl === ''
                      ? {
                          uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                        }
                      : {uri: promiseeProfileImageUrl}
                  }
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5),
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(3),
                  width: wp(45),
                }}>
                <Text style={{color: 'white', fontSize: hp(2)}}>{name}</Text>
              </View>
              <View style={{width: wp(8)}}>
                <Entypo size={20} color="white" name="calendar" />
              </View>

              <View>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0.7),
                      color: 'white',
                      marginTop: wp(0.3),
                    },
                  ]}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </Text>
              </View>
            </View>
            {/* <View style={DashBoardStyling.PromiseGoal}>
             <View>
               <Text
                 style={[
                   Headings.Input5,
                   {color: 'white', textAlign: 'center'},
                 ]}>
                 {item.promiseGoal}
               </Text>
             </View>
           </View> */}
            <View style={DashBoardStyling.PromiseReward}>
              {guaranteedWithMoney ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  Commitment: ${amount}  {rewardPoints ? (
                    <Text> & {rewardPoints} Reward Points</Text>
                  ) : null}
                </Text>
              ) : null}
              {/* {promiseMediaURL ? (
               <TouchableOpacity
                 onPress={() =>
                   handelAttachedMedia(promiseMediaURL)
                 }>
                 <Text style={{color: 'blue'}}>Attached File</Text>
               </TouchableOpacity>
             ) : null} */}
            </View>
          </View>
        </LinearGradient>
      ) : tab == 'PromisestoMe' || tab == 'Promise' ? (
        <LinearGradient
          colors={
            tab == 'Promise' ? ['#E4A936', '#EE8347'] : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MiniCard}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <View
          style={{
            width: wp(12),
            height: hp(6),
            backgroundColor: 'grey',
            marginTop: hp(0.5),
            borderRadius: wp(12),
            
          }}></View> */}
              <View
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5), // Half of the width
                  marginLeft: wp(2),
                  marginTop: hp(1),
                }}>
                <Image
                  source={
                    promiseeProfileImageUrl === ''
                      ? {
                          uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                        }
                      : {uri: promiseeProfileImageUrl}
                  }
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5), 
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(3),
                  width: wp(45),
                }}>
                <Text style={{color: 'white', fontSize: hp(2)}}>{name}</Text>
              </View>
              <View style={{width: wp(8)}}>
                <Entypo size={20} color="white" name="calendar" />
              </View>

              <View>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0.7),
                      color: 'white',
                      marginTop: wp(0.3),
                    },
                  ]}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </Text>
              </View>
            </View>
            {/* <View style={DashBoardStyling.PromiseGoal}>
          <View>
            <Text
              style={[
                Headings.Input5,
                {color: 'white', textAlign: 'center'},
              ]}>
              {item.promiseGoal}
            </Text>
          </View>
        </View> */}
            <View style={DashBoardStyling.PromiseReward}>
              {promisetype == 'GUARANTEE' ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  Guarantee: $ {amount} {rewardPoints ? <Text>and {rewardPoints} reward Points</Text> : null}
                </Text>
              ) : promisetype == 'COMMITMENT' ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),

                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  Commitment: $ {amount} {rewardPoints ? <Text>and {rewardPoints} reward Points</Text> : null}
                </Text>
              ) : null}
              {/* {promiseMediaURL ? (
                <TouchableOpacity
                  onPress={() => handelAttachedMedia(promiseMediaURL)}>
                  <Text style={{color: 'blue'}}>Attached File</Text>
                </TouchableOpacity>
              ) : null} */}
            </View>
          </View>
        </LinearGradient>
      ) : null}
    </>
  );
};

export default MiniCard;
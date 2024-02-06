import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DashBoardStyling } from '../../Styling/DashBoard';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { Headings } from '../../Styling/Headings';
import { format } from 'date-fns';
import { showMyPromises } from '../../recoil/Dashboard/dashBoard'
import { useRecoilState } from 'recoil';

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

  const [markCompleted, setMarkCompleted] = useState(false);
  const [markFailed, setMarkFailed] = useState(false);



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
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
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
                      : { uri: promiseeProfileImageUrl }
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
                <Text style={{ color: 'white', fontSize: hp(2), fontWeight: 'bold', }}>{name}</Text>
              </View>
              <View style={{ width: wp(8) }}>
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
          <View style={{ paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                      : { uri: promiseeProfileImageUrl }
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
                <Text style={{ color: 'white', fontSize: hp(2),fontWeight: 'bold', }}>{name}</Text>
              </View>
              <View style={{ width: wp(8) }}>
                <Entypo size={25} color="white" name="calendar" />
              </View>

              <View>
              <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0),
                      color: 'white',
                      marginTop: wp(0.3),
                      fontSize:12,
                    },
                  ]}>
                  Deadline
                </Text>
                <Text
                  style={[
                    Headings.Input6,
                    {
                      marginLeft: wp(0),
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
            <View style={{ paddingHorizontal: 15 }}>
              <View >
                <Text style={{
                  textAlign: 'justify', fontWeight: 'bold', fontSize: 14, color:"white"
                }}>
                  Harry promised you to meet you on Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem aperiam, ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                </Text>
              </View>
              <View style={[DashBoardStyling.PromiseReward, {textAlign: 'center', justifyContent: 'center', alignItems: 'center',
              }]}>
                {promisetype == 'GUARANTEE' ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                        marginHorizontal: hp(2),
                        fontWeight: 'bold', 
                        fontSize: 18, 
                        fontSize: hp(2),
                      },
                    ]}>
                    Guarantee: ${amount} {rewardPoints ? <Text >{rewardPoints} reward Points</Text> : null}
                  </Text>
                ) : promisetype == 'COMMITMENT' ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                        marginHorizontal: hp(2),
                        fontWeight: 'bold', 
                        fontSize: 18, 
                        //  fontWeight: 'bold',
                        fontSize: hp(2),
                      },
                    ]}>
                    Commitment: ${amount} {rewardPoints ? <Text style={{ }}>Reward: ${rewardPoints}</Text> : null}
                  </Text>
                ) : null}
                {promiseMediaURL ? (
                  <TouchableOpacity
                    onPress={() => handelAttachedMedia(promiseMediaURL)}>
                    <Text style={{ color: 'blue' }}>Attached File</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: hp(5),
                marginTop: hp(.5),
                paddingHorizontal: 55
              }}>
              <TouchableOpacity
                onPress={() => {
                  setMarkCompleted(true);
                }}
                style={styles.LinerC}>
                <LinearGradient
                  colors={markCompleted ? ['#1D1B201F', '#1D1B201F'] : ['#32C35B', '#32C35B']}
                  style={styles.left}>
                  <Text style={{ color: !markCompleted ? 'white' : '#191C1A', textAlign: 'center' }}>
                    Mark Completed
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMarkCompleted(false);
                }}
                style={styles.LinerC}>
                <LinearGradient
                  // colors={['#E32E2E', '#E32E2E']}
                  colors={markCompleted ? ['#E32E2E', '#E32E2E']:['#1D1B201F', '#1D1B201F']  }
                  style={styles.right}>
                  <Text style={{ color: markCompleted ? 'white' : '#191C1A', textAlign: 'center' }}>
                    Mark Failed
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>


          </View>
        </LinearGradient>
      ) : null}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  left: {
    // flex: 1,
    width: wp(33),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    height: hp(5),
    paddingHorizontal: 10,
    fontWeight: 'bold', 
    fontSize: 18, 
  },
  right: {
    // flex: 1,
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    height: hp(5)
  },
});

export default MiniCard;

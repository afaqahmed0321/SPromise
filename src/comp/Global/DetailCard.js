import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
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
import EvilIcon from 'react-native-vector-icons/Feather';
import {format} from 'date-fns';
import {
  handleAcceptPromise,
  handleCompletePromise,
  handleFailPromise,
  handleRejectPromise,
} from '../Dashboard/Promise/PromiseAction';
import {commonStyles} from '../../Styling/buttons';
import WebView from 'react-native-webview';
import {
  handleAccept,
  handleReject,
} from '../Dashboard/ReqPromiseDashBoard/Action';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';

const DetailCard = ({
  promiseeProfileImageUrl,
  promisetype,
  amount,
  name,
  date,
  promiseMediaURL,
  ratingImpact,
  promiseGoal,
  actions,
  promiseID,
  userN,
  tab,
  guaranteedWithMoney,
  alotRewardPoints,
  rewardPoints,
  refreshCallback,
}) => {
  const [isPaymentWebViewVisible, setIsPaymentWebViewVisible] = useState(false);
  return (
    <>
      {tab == 'UserPromiseReq' || tab == 'ReqPromiseDashboard' ? (
        <LinearGradient
          colors={
            tab == 'UserPromiseReq'
              ? ['#E4A936', '#EE8347']
              : ['#73B6BF', '#2E888C']
          }
          style={DashBoardStyling.MainCard}>
          <View
            style={
              {
                // alignItems: 'center',
              }
            }>
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
                  width: wp(12),
                  height: hp(6),
                  borderRadius: wp(6), // Half of the width
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
                    width: wp(12),
                    height: hp(6),
                    borderRadius: wp(6), // Half of the width
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
                {/* <Text
                        style={[
                          Headings.Input5,
                          {
                            marginLeft: wp(0.7),
                            color: 'white',
                            marginTop: wp(0.3),
                          },
                        ]}>
                        DeadLine
                      </Text> */}
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
                  Commitment: ${amount} {alotRewardPoints ? (
                    <Text> & {rewardPoints} Reward Points</Text>
                  ) : null}
                </Text>
              ) : null}
            </View>
            {/* <View style={DashBoardStyling.PromiseReward}>
              {alotRewardPoints ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  {rewardPoints} Reward points will be given
                </Text>
              ) : null}
            </View> */}
            {ratingImpact ? (
              <View>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      fontSize: hp(2),
                    },
                  ]}>
                  Rating will impact
                </Text>
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <Text style={{color: 'blue'}}>Attached File</Text>
              </TouchableOpacity>
            ) : null}
            <View style={DashBoardStyling.PromiseGoal}>
              <View>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      fontSize: hp(2),
                    },
                  ]}>
                  {promiseGoal}
                </Text>
              </View>
            </View>
            {/* <View
                    style={DashBoardStyling.PromiseReward}>
                 
                      <Text
                        style={[
                          {
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: hp(2.3),
                          },
                        ]}>
                        Amount: {item.paymentAmount}$
                      </Text>
                    {item.promiseMediaURL ? (
                      <TouchableOpacity
                        onPress={() =>
                          handelAttachedMedia(item.promiseMediaURL)
                        }>
                        <Text style={{color: 'blue'}}>Attached File</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View> */}
            {/* <View
                    style={DashBoardStyling.PromiseReward}>
                    {item.paymentAmount == '0' ? (
                      <Text
                        style={[
                          {
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: hp(2.3),
                          },
                        ]}>
                        Guarantee: {item.paymentAmount}$
                      </Text>
                    ) : ( null
                      // <Text
                      //   style={[
                      //     {
                      //       color: 'white',
                      //       fontWeight: 'bold',
                      //       fontSize: hp(2.3),
                      //     },
                      //   ]}>
                      //   Commitment: 
                      // </Text>
                    )}
  

                    {item.promiseMediaURL ? (
                      <TouchableOpacity
                        onPress={() =>
                          handelAttachedMedia(item.promiseMediaURL)
                        }>
                        <Text style={{color: 'blue'}}>Attached File</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',

                marginTop: hp(1),
                width: wp(90),
              }}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        // handleAcceptPromise(promiseID, userN);
                        handleAccept(promiseID, userN);
                        refreshCallback();
                        //   setrefresh(!refersh)
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Reject') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, {backgroundColor: 'red'}]}
                      key={index}
                      onPress={() => {
                        handleReject(promiseID, userN);
                        refreshCallback();
                        // handleRejectPromise(promiseID, userN);
                        //   setrefresh(!refersh)
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                }
                // else if (action === 'Complete') {
                //   return (
                //     <TouchableOpacity
                //       style={[commonStyles.ActionBtn]}
                //       key={index}
                //       onPress={() => {
                //         handleCompletePromise(promiseID, userN);
                //         //   setrefresh(!refersh)
                //       }}>
                //       <Text>{action}</Text>
                //     </TouchableOpacity>
                //   );
                // }
                //  else if (action === 'Fail') {
                //   return (
                //     <TouchableOpacity
                //       style={[commonStyles.ActionBtn, {backgroundColor: 'red'}]}
                //       key={index}
                //       onPress={() => {
                //         handleFailPromise(promiseID, userN);
                //         refreshCallback();

                //         // setrefresh(!refersh)
                //       }}>
                //       <Text>{action}</Text>
                //     </TouchableOpacity>
                //   );
                // }
                else if (action === 'Pay') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        // handleFailPromise(promiseID, userN);
                        setIsPaymentWebViewVisible(true);
                        // setrefresh(!refersh)
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
              {/* {item.actions.map((action, index) => {
                      if (action === 'Accept') {
                        return (
                          <TouchableOpacity
                            style={commonStyles.ActionBtn}
                            key={index}
                            onPress={() =>
                              handleAcceptPromise(item.promiseID, userN)
                            }>
                            <Text>{action}</Text>
                          </TouchableOpacity>
                        );
                      } else if (action === 'Reject') {
                        return (
                          <TouchableOpacity
                            style={[
                              commonStyles.ActionBtn,
                              {backgroundColor: 'red'},
                            ]}
                            key={index}
                            onPress={() =>
                              handleRejectPromise(item.promiseID, userN)
                            }>
                            <Text>{action}</Text>
                          </TouchableOpacity>
                        );
                      } else if (action === 'Complete') {
                        return (
                          <TouchableOpacity
                            style={[commonStyles.ActionBtn]}
                            key={index}
                            onPress={() =>
                              handleCompletePromise(item.promiseID, userN)
                            }>
                            <Text>{action}</Text>
                          </TouchableOpacity>
                        );
                      } else if (action === 'Fail') {
                        return (
                          <TouchableOpacity
                            style={[
                              commonStyles.ActionBtn,
                              {backgroundColor: 'red'},
                            ]}
                            key={index}
                            onPress={() =>
                              handleFailPromise(item.promiseID, userN)
                            }>
                            <Text>{action}</Text>
                          </TouchableOpacity>
                        );
                      }
                    })} */}
            </View>
          </View>
        </LinearGradient>
      ) : tab == 'PromisestoMe' || tab == 'Promise' ? (
        <LinearGradient
          colors={
            tab == 'PromisestoMe'
              ? ['#73B6BF', '#2E888C']
              : ['#E4A936', '#EE8347']
          }
          style={DashBoardStyling.MainCard}>
          <View
            style={
              {
                // alignItems: 'center',
              }
            }>
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
                    borderRadius: wp(6.5), // Half of the width
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
                {/* <Text
         style={[
           Headings.Input5,
           {
             marginLeft: wp(0.7),
             color: 'white',
             marginTop: wp(0.3),
           },
         ]}>
         DeadLine
       </Text> */}
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
            <View style={DashBoardStyling.PromiseReward}>
              {promisetype == 'GUARANTEE' ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      //  fontWeight: 'bold',
                      fontSize: hp(1.8),
                    },
                  ]}>
                  Guarantee:$ {amount}{' '}
                  {rewardPoints ? (
                    <Text> & {rewardPoints} Reward Points</Text>
                  ) : null}
                </Text>
              ) : promisetype == 'COMMITMENT' ? (
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),
                      fontSize: hp(1.8),
                    },
                  ]}>
                  Commitment:$ {amount}{' '}
                  {rewardPoints ? (
                    <Text> & {rewardPoints} Reward Points</Text>
                  ) : null}
                </Text>
              ) : null}
            </View>

            {ratingImpact ? (
              <View>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),

                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  Rating will impact
                </Text>
              </View>
            ) : null}

            {promiseMediaURL ? (
              <TouchableOpacity
                onPress={() => handelAttachedMedia(promiseMediaURL)}>
                <Text style={{color: 'blue'}}>Attached File</Text>
              </TouchableOpacity>
            ) : null}
            <View style={DashBoardStyling.PromiseGoal}>
              <View>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginHorizontal: hp(2),

                      //  fontWeight: 'bold',
                      fontSize: hp(2),
                    },
                  ]}>
                  {promiseGoal}
                </Text>
              </View>
            </View>
            {/* <View
     style={DashBoardStyling.PromiseReward}>
  
       <Text
         style={[
           {
             color: 'white',
             fontWeight: 'bold',
             fontSize: hp(2.3),
           },
         ]}>
         Amount: {item.paymentAmount}$
       </Text>
     {item.promiseMediaURL ? (
       <TouchableOpacity
         onPress={() =>
           handelAttachedMedia(item.promiseMediaURL)
         }>
         <Text style={{color: 'blue'}}>Attached File</Text>
       </TouchableOpacity>
     ) : null}
   </View> */}
            {/* <View
     style={DashBoardStyling.PromiseReward}>
     {item.paymentAmount == '0' ? (
       <Text
         style={[
           {
             color: 'white',
             fontWeight: 'bold',
             fontSize: hp(2.3),
           },
         ]}>
         Guarantee: {item.paymentAmount}$
       </Text>
     ) : ( null
       // <Text
       //   style={[
       //     {
       //       color: 'white',
       //       fontWeight: 'bold',
       //       fontSize: hp(2.3),
       //     },
       //   ]}>
       //   Commitment: 
       // </Text>
     )}


     {item.promiseMediaURL ? (
       <TouchableOpacity
         onPress={() =>
           handelAttachedMedia(item.promiseMediaURL)
         }>
         <Text style={{color: 'blue'}}>Attached File</Text>
       </TouchableOpacity>
     ) : null}
   </View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp(0.5),
                width: wp(90),
              }}>
              {actions.map((action, index) => {
                if (action === 'Accept') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        handleAcceptPromise(promiseID, userN);
                        // setrefresh(!refersh)
                        refreshCallback();
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Reject') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, {backgroundColor: 'red'}]}
                      key={index}
                      onPress={() => {
                        handleRejectPromise(promiseID, userN);
                        // setrefresh(!refersh)
                        refreshCallback();
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Complete') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn]}
                      key={index}
                      onPress={() => {
                        handleCompletePromise(promiseID, userN);
                        //   setrefresh(!refersh)
                        refreshCallback();
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Fail') {
                  return (
                    <TouchableOpacity
                      style={[commonStyles.ActionBtn, {backgroundColor: 'red'}]}
                      key={index}
                      onPress={() => {
                        handleFailPromise(promiseID, userN);
                        // setrefresh(!refersh)
                        refreshCallback();
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                } else if (action === 'Pay') {
                  return (
                    <TouchableOpacity
                      style={commonStyles.ActionBtn}
                      key={index}
                      onPress={() => {
                        // handleFailPromise(promiseID, userN);
                        setIsPaymentWebViewVisible(true);
                        // setrefresh(!refersh)
                      }}>
                      <Text>{action}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
              {/* {item.actions.map((action, index) => {
       if (action === 'Accept') {
         return (
           <TouchableOpacity
             style={commonStyles.ActionBtn}
             key={index}
             onPress={() =>
               handleAcceptPromise(item.promiseID, userN)
             }>
             <Text>{action}</Text>
           </TouchableOpacity>
         );
       } else if (action === 'Reject') {
         return (
           <TouchableOpacity
             style={[
               commonStyles.ActionBtn,
               {backgroundColor: 'red'},
             ]}
             key={index}
             onPress={() =>
               handleRejectPromise(item.promiseID, userN)
             }>
             <Text>{action}</Text>
           </TouchableOpacity>
         );
       } else if (action === 'Complete') {
         return (
           <TouchableOpacity
             style={[commonStyles.ActionBtn]}
             key={index}
             onPress={() =>
               handleCompletePromise(item.promiseID, userN)
             }>
             <Text>{action}</Text>
           </TouchableOpacity>
         );
       } else if (action === 'Fail') {
         return (
           <TouchableOpacity
             style={[
               commonStyles.ActionBtn,
               {backgroundColor: 'red'},
             ]}
             key={index}
             onPress={() =>
               handleFailPromise(item.promiseID, userN)
             }>
             <Text>{action}</Text>
           </TouchableOpacity>
         );
       }
     })} */}
            </View>
          </View>
        </LinearGradient>
      ) : null}
      <Modal
        animationType="slide"
        // transparent={true}
        visible={isPaymentWebViewVisible}
        onRequestClose={isPaymentWebViewVisible}>
        <SafeAreaView style={{height: '100%', width: wp(100)}}>
          <TouchableOpacity
            onPress={() => setIsPaymentWebViewVisible(false)}
            style={{
              marginLeft: wp(2),
              height: hp(5),
              marginTop: hp(1),
            }}>
            <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />

            {/* <EvilIcon name="arrow-left-circle" size={30} color="black" /> */}
          </TouchableOpacity>
          <WebView
            source={{
              uri: `http://138.197.52.199/payment/${userN}/${promiseID}`,
            }}
            style={{height: '100%', width: wp(100)}}
            // onError={syntheticEvent =>
            //   console.log('WebView error: ', syntheticEvent.nativeEvent)
            // }
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default DetailCard;

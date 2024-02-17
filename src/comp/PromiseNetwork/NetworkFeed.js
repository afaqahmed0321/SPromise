/**
 * The NetworkFeed function is a React Native component that displays a feed of promises made by users
 * in a network, allows users to react to promises and add comments, and includes search and filter
 * functionality.
 * @returns The NetworkFeed component is being returned.
 */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  IspromiseNetworkmodalVisible,
  selectedNetworkUserFeed,
} from '../../recoil/Users/UserNetwork/Network';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ToastAndroid } from 'react-native';
import { UserNo } from '../../recoil/AddPromise';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Evil from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/AntDesign';

import { DashBoardStyling } from '../../Styling/DashBoard';
import PromiseReaction from '../../Network/Users/NetworkFeed/PromiseReaction';
import PromiseComment from '../../Network/Users/NetworkFeed/AddCommentAPI';
import PromiseNetwork from '../../screens/PromiseNetwork';
import NetWorkFeedApi from '../../Network/Users/NetworkFeed/NetworkFeedAPi';
import axios from 'axios';
import {RefreshControl} from 'react-native';

const NetworkFeed = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [promiseComments, setPromiseComments] = useState([]);
  const [selectedNetworkUserFee, setSelectedNetworkUserFee] = useRecoilState(
    selectedNetworkUserFeed,
  );
  const [isViewAll, setIsViewAll] = useState([]);
  const [refersh, setrefresh] = useState(false);

  const focus = useIsFocused();
  const [userN, setUserN] = useRecoilState(UserNo);
  const [networkUser, setNetworkUser] = useState('');
  const [comment, setComment] = useState('');
  const [isnetworkModalVi, setIsnetworkModVi] = useRecoilState(
    IspromiseNetworkmodalVisible,
  );
  const [like, setLike] = useState(false);
  const [isLike, setIsLike] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('Private');

  const handelNetworkFeedComp = async () => {
    const networkUserNo = userN;
    console.log('UserNo is ', networkUserNo);
    // const resp = NetWorkFeedApi(networkUserNo);
    const resp = await axios.get(`https://snappromise.com:8080/getUserNetworkFeed?userNo=${networkUserNo}&visibility=private`)
      .then((response) => {
        const data = response.data.promisesList; // Accessing the data property of the Axios response
        console.log(data, "Network Feed");
        setIsLoading(false);
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
        return null; // Returning null in case of an error, you can adjust this as needed
      })
    setSelectedNetworkUserFee(resp);
    console.log("this from fedback", resp);
  };
  const handleVisibilityChange = visibilityOption => {
    setVisibility(visibilityOption);
  };
  const onRefresh = () => {
    setrefresh(!refersh);
  };
  // const handleSearch = () => {
  //   const filtered = selectedNetworkUserFee.filter(
  //     item =>
  //       item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
  //       item.lastName.toLowerCase().includes(searchText.toLowerCase()),
  //   );
  //   setFilteredData(filtered);
  // };

  const handleSearch = () => {

    const filtered = selectedNetworkUserFee.filter(item =>
      item.promisorName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);

  };
  useEffect(() => {
    handelNetworkFeedComp();
  }, [focus, refersh]);

  const onHandelReaction = async (PID, LikeA) => {
    const PIDd = PID;
    const userNN = userN;
    console.log(userNN, "New UserNo")
    // console.log(LikeA.find(item => item === userN))
    // let containsPromiseId=false;
    // const Reac = LikeA.find(item => item === userN);
    const containsPromiseId = LikeA.includes(userNN);

    const Reac = containsPromiseId ? "UnLike" : "Like";
    console.log(containsPromiseId, "Reac");
    // console.log('UserNo is ', userNN);
    // console.log('Before APi Call', userNN, 'UserNO', PID, 'Promise ID');

    const res = await PromiseReaction(userNN, PIDd, Reac);
    // console.log(res.code);
    setrefresh(!refersh)
    // setPromiseComments
  };

  const onHandelComment = async PID => {
    const userNN = userN;

    // const commen = comment

    if (comment === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter comment',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    // console.log(userNN, 'UserNO' + PID);
    else {
      const commen = comment;
      console.log('Api Calling');
      const res = await PromiseComment(userNN, PID, commen);
      setrefresh(!refersh)
      setComment('')
    }
  };

  // const handleViewAllComments = () => {
  //   // setIsViewAll(true);
  //   isViewAll ? setIsViewAll(false) : setIsViewAll(true);
  // };

  const renderItem = ({ item }) => {
    const userNN = userN;
    const setLike = item.promiseReactions;
    const handleViewAllComments = (promiseID) => {
      if (isViewAll.includes(promiseID)) {
        const updatedArray = isViewAll.filter(item => item !== promiseID);
        setIsViewAll(updatedArray);
      }
      else {
        setIsViewAll([...isViewAll, promiseID])

      }
      // setIsViewAll(promiseID);
    };
    const getTotalLikes = () => {
      return item.promiseReactions.length;
    };

    // Function to handle like/unlike action
    const handleLikeAction = (promiseID) => {
      const isLiked = item.promiseReactions.includes(userN);
      const action = isLiked ? "Unlike" : "Like";
      onHandelReaction(promiseID, item.promiseReactions, action);
    };
    return (
      <View
        style={{
          backgroundColor: '#F5EEFF',
          width: wp(90),
          marginVertical: hp(1),
          marginTop: 5,
          borderRadius: wp(6.5),
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", paddingRight: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              width: wp(23),
              height: hp(6),
              borderRadius: wp(6.5), // Half of the width
              marginLeft: wp(2),
              marginTop: hp(1),
            }}>
            <Image
              source={
                item.promisorProfileImageUrl === '' ||
                  item.promisorProfileImageUrl === 'string'
                  ? {
                    uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                  }
                  : { uri: item.promisorProfileImageUrl }
              }
              style={{
                width: wp(13),
                height: hp(6),
                borderRadius: wp(6.5), // Half of the width
              }}
            />
            <View style={{ marginLeft: wp(3) }}>
              <Text
                style={{ color: '#652D90', fontWeight: 'bold', fontSize: hp(2) }}>
                {item.promisorName}
              </Text>
            </View>
          </View>


          <TouchableOpacity
            onPress={() => {
              const PID = item.promiseID;
              handleLikeAction(PID);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: wp(20),
            }}>
            {item.promiseReactions.find(item => item === userN) ? (
              <Ant name="like1" size={23} color="blue" />
            ) : (
              <Ant name="like1" size={23} color="grey" />
            )}
            <Text
              style={{
                color: 'grey',
                fontWeight: 'bold',
                fontSize: hp(2),
                marginRight: 12
              }}>
              Like
            </Text>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: hp(2), marginLeft:-12 }}>({getTotalLikes()})</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: wp(2) }}>
          {item.promiseType == 'GUARANTEE' ? (
            <Text
              style={[
                {
                  color: '#652D90',
                  fontWeight: 'bold',
                  fontSize: hp(2.3),
                },
              ]}>
              Amount: {item.paymentAmount}$
            </Text>
          ) : (
            <>
              <Text
                style={[
                  {
                    color: '#652D90',
                    fontWeight: 'bold',
                    fontSize: hp(2.3),
                  },
                ]}>
                Amount: {item.paymentAmount}$
              </Text>
              <Text
                style={[
                  {
                    color: '#652D90',
                    fontWeight: 'bold',
                    fontSize: hp(2.3),
                  },
                ]}>
                Reward: +{item.rewardPoints} pts
              </Text>
            </>
          )}
          {/* {item.promiseMediaURL ? (
          <TouchableOpacity
            onPress={() => handelAttachedMedia(item.promiseMediaURL)}>
            <Text style={{color: 'blue'}}>Attached File</Text>
          </TouchableOpacity>
            ) : null} */}
        </View>
        <View style={{ height: hp(10) }}>
          <Text
            style={[
              {
                color: '#652D90',
                fontWeight: 'bold',
                fontSize: hp(1.6),
                textAlign: 'center',
              },
            ]}>
            {item.promiseGoal}
          </Text>
        </View>
        {/* //Like and Share Section  */}
        <View
          style={{
            marginLeft: wp(2),
            // borderWidth: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {/* {item.promiseReactions.includes(userN) ? (
            <TouchableOpacity
              onPress={() => {
                const PID = item.promiseID;
                onHandelReaction(PID);
              }}
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: wp(20),
              }}>
              <Ant name="like1" size={23} color="#652D90" />
              <Text
                style={[
                  {
                    color: '#652D90',
                    fontWeight: 'bold',
                    fontSize: hp(2),
                  },
                ]}>
                Like
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                const PID = item.promiseID;
                onHandelReaction(() => {
                  console.log('item.promiseReactions:', item.promiseReactions);
                  console.log('userN:', userN);
                  console.log(
                    'Condition:',
                    item.promiseReactions.includes(userN),
                  );
                  PID;
                });
              }}
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: wp(20),
              }}>
              <Ant name="like1" size={23} color="grey" />
              <Text
                style={[
                  {
                    color: 'grey',
                    fontWeight: 'bold',
                    fontSize: hp(2),
                    // textAlign: 'center',
                  },
                ]}>
                Like
              </Text>
            </TouchableOpacity>
          )} */}


          {/* {
  
  item.promiseReactions.includes(userNN) ? (
    <TouchableOpacity
      onPress={() => {
        const PID = item.promiseID;
        onHandelReaction(PID);
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: wp(20),
      }}
    >
      <Ant name="like1" size={23} color="#652D90" />
      <Text
        style={{
          color: '#652D90',
          fontWeight: 'bold',
          fontSize: hp(2),
        }}
      >
        Like
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        const PID = item.promiseID;
        onHandelReaction(PID);
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: wp(20),
      }}
    >
      <Ant name="like1" size={23} color="grey" />
      <Text
        style={{
          color: 'grey',
          fontWeight: 'bold',
          fontSize: hp(2),
        }}
      >
        Like
      </Text>
    </TouchableOpacity>
  )
} */}

          {/* <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: wp(20),
            }}>
            <Evil name="share-google" size={30} color="#652D90" />

            <Text
              style={[
                {
                  color: '#652D90',
                  fontWeight: 'bold',
                  fontSize: hp(2),
                  // textAlign: 'center',
                },
              ]}>
              Share
            </Text>
          </View> */}
        </View>
        {/* /// Comments Section */}
        <View style={{ marginLeft: wp(2) }}>
          {item.promiseComments && item.promiseComments.length > 0 ? (
            item.promiseComments
              .slice(0, isViewAll.includes(item.promiseID) ? item.promiseComments.length : 2)
              .map(comment => (
                <View
                  key={comment.serialNo}
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: wp(13),
                      height: hp(6),
                      borderRadius: wp(6.5),
                      marginLeft: wp(2),
                      marginVertical: hp(1),
                    }}>
                    <Image
                      source={
                        comment.userImageURL === '' ||
                          comment.userImageURL === 'string'
                          ? {
                            uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                          }
                          : { uri: comment.userImageURL }
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
                      // borderWidth: 1,
                      flexDirection: 'column',
                      width: wp(65),
                      marginLeft: wp(3),
                    }}>
                    <Text style={{ color: "black" }}>{comment.userName}</Text>
                    <Text style={{ color: "black" }}>{comment.comment}</Text>
                  </View>
                </View>
              ))
          ) : (
            <Text style={{ color: "black", margin: 10 }}>No comments for this promise</Text>
          )}
          {item.promiseComments && item.promiseComments.length > 2 && (
            <TouchableOpacity onPress={() => handleViewAllComments(item.promiseID)}>
              {isViewAll.includes(item.promiseID) ? (
                <Text style={{ color: "black" }}>View Less</Text>
              ) : (
                <Text style={{ color: "black" }}>View All Comments</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        {/* Add Comment Section  */}
        <View style={{}}>
          <TextInput
            onChangeText={text => {
              setComment(text);
              // console.log(text);
            }}
            placeholder="Add a comment"
            placeholderTextColor={"black"}
            style={{
              borderWidth: wp(0.5),
              borderColor: '#652D90',
              backgroundColor: 'white',
              borderRadius: wp(6.5),
              marginHorizontal: 10,
              paddingLeft: wp(2.2),
              color: "black"
            }}></TextInput>
          {/* <TouchableOpacity
              style={{ position: 'absolute', right: wp(4.5), top: hp(1.5) }}>
              <Material name="insert-emoticon" size={30} color="#652D90" />
            </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              width: wp(30),
              // borderw: 1,
              height: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#652D90',
              borderRadius: wp(10),
              marginVertical: hp(1),
              marginLeft: wp(30),
            }}
            onPress={() => {
              const PID = item.promiseID;
              onHandelComment(PID);
              setComment('')
              console.log(comment, "comment")
            }}>
            <Text style={{ color: "white" }}>Add Comment</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#E4EEE6',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: hp(20),
          flexDirection: 'row',
          alignItems: 'center',
          // marginLeft: wp(3),
          // justifyContent: 'center',
          // borderWidth: 1,
        }}>
        {/* // Show All filter */}
        {/* <Feather name="filter" size={23} color="black" />
     <TouchableOpacity
       style={{
         height: hp(4),
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft: wp(3),
       }}>
       <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
         Show All
       </Text>
       <Feather name="chevron-down" size={23} color="black" />
     </TouchableOpacity> */}

        <View style={{ width: wp(60) }}>
          {/* <TextInput style={styles.SearchInpF} placeholder='Search User'>
     
     </TextInput>
     <TouchableOpacity
             style={{position: 'absolute', right: hp(1.8), top: hp(.8)}}>
             <Feather name="search" size={20} color="#8250A6" />
         </TouchableOpacity> */}

          <TextInput
            placeholder="Search User"
            placeholderTextColor={"grey"}
            style={styles.SearchInpF}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              // Trigger search on text change
            }}
          />
          {/* <TouchableOpacity onPress={handleSearch}
             style={{position: 'absolute', right: hp(1.8), top: hp(.8)}}>
             <Feather name="search" size={20} color="#8250A6" />
         </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => handleSearch}
          style={{
            height: hp(5),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            borderRadius: wp(10),
            width: wp(30),
            backgroundColor: '#6650A4',
            justifyContent: 'center',
            marginTop:wp(28)

          }}>

          <Material name="search" size={20} color="white" />
          <View style={{ marginLeft: wp(1.5) }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: "600" }}> Search </Text>
          </View>

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={isnetworkModalVi}
            onRequestClose={isnetworkModalVi}>
            <PromiseNetwork />
          </Modal> */}

          {/* <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
         {' '}
         Invite User
       </Text> */}
        </TouchableOpacity>
        
      </View>
      <View
        style={{
          marginTop: hp(1),
          // borderWidth: wp(1),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: wp(84),
          backgroundColor: '#cebdff',
          borderRadius: wp(10),
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            visibility === 'Public' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Public')}>
          <Text style={styles.BtnText}>Public</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            visibility === 'Private' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Private')}>
          <Text style={styles.BtnText}>Private</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            visibility === 'Network' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Network')}>
          <Text style={styles.BtnText}>Network Only</Text>
        </TouchableOpacity>
        
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
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
            data={searchText.length > 0 ? filteredData : selectedNetworkUserFee}
            // data={selectedNetworkUserFee}
            // data={searchText.length > 0 ? filteredData : networkUser}
            keyExtractor={item => item.promiseID.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

export default NetworkFeed;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(26),
  },

  CiBox: {
    backgroundColor: 'grey',
    width: wp(13),
    height: hp(6),
    borderRadius: wp(13) / 2,
    marginTop: wp(0.5),
  },
  SearchInpF: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    fontSize: hp(2.2),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    marginTop:wp(28)
  },
  containerr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    // borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: wp(28),
    justifyContent: 'center',
    textAlign: 'center',
    
  },
  selectedButton: {
    backgroundColor: '#6650A4',
    borderRadius: wp(14),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  BtnText: {
    textAlign: 'center',
    color:"white",
    fontWeight:'600'
  },
});

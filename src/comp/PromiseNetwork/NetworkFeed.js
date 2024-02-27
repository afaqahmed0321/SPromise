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
import { useIsFocused } from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ant from 'react-native-vector-icons/AntDesign';

import PromiseReaction from '../../Network/Users/NetworkFeed/PromiseReaction';
import PromiseComment from '../../Network/Users/NetworkFeed/AddCommentAPI';
import axios from 'axios';
import { RefreshControl } from 'react-native';

const NetworkFeed = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [promiseComments, setPromiseComments] = useState([]);
  const [selectedNetworkUserFee, setSelectedNetworkUserFee] = useRecoilState(
    selectedNetworkUserFeed,
  );

  const [allData, setAllData] = useState(selectedNetworkUserFee)
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
  const [visibilityy, setVisibilityy] = useState('Private');
  const [visible, setVisible] = useState('');

  const privateData = selectedNetworkUserFee.filter(item => item.visibility === 'PRIVATE');
  const publicData = selectedNetworkUserFee.filter(item => item.visibility === 'PUBLIC');
  const networkonlyData = selectedNetworkUserFee.filter(item => item.visibility === 'NETWORKONLY');


  const handelNetworkFeedComp = async () => {
    const networkUserNo = userN;
    console.log('UserNo is ', networkUserNo);
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
  const handleVisibilityChange = (visibilityOption) => {
    setVisibilityy(visibilityOption);
  };
  const onRefresh = () => {
    setrefresh(!refersh);
  };


  const handleSearch = () => {
    console.log("search");
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

    const containsPromiseId = LikeA.includes(userNN);

    const Reac = containsPromiseId ? "UnLike" : "Like";
    console.log(containsPromiseId, "Reac");


    const res = await PromiseReaction(userNN, PIDd, Reac);
    setrefresh(!refersh)
  };

  const onHandelComment = async PID => {
    const userNN = userN;
    if (comment === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter comment',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else {
      const commen = comment;
      console.log('Api Calling');
      const res = await PromiseComment(userNN, PID, commen);
      setrefresh(!refersh)
      setComment('')
    }
  };


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
    };
    const getTotalLikes = () => {
      return item.promiseReactions.length;
    };

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
              borderRadius: wp(6.5),
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
                borderRadius: wp(6.5),
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
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: hp(2), marginLeft: -12 }}>({getTotalLikes()})</Text>
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
        <View
          style={{
            marginLeft: wp(2),
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>

        </View>
        <View style={{ marginLeft: wp(2) }}>
          {item.promiseComments && item.promiseComments.length > 0 ? (
            item.promiseComments
              .slice(0, isViewAll.includes(item.promiseID) ? item.promiseComments.length : 2)
              .map(comment => (
                <View
                  key={comment.serialNo}
                  style={{
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
                <Text style={{ color: '#652D90', fontWeight: 'bold', marginLeft: 15, marginVertical: 10, }}>View Less</Text>
              ) : (
                <Text style={{ color: '#652D90', fontWeight: 'bold', marginLeft: 15, marginVertical: 10 }}>View All Comments</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={{}}>
          <TextInput
            onChangeText={text => {
              setComment(text);
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


          <TouchableOpacity
            style={{
              width: wp(30),
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
        alignItems: 'center',
      }}>
      <View
        style={{
          height: hp(8),
          flexDirection: 'row',
          alignItems: 'center',

        }}>


        <View style={{ width: wp(60) }}>


          <TextInput
            placeholder="Search User"
            placeholderTextColor={"grey"}
            style={styles.SearchInpF}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
            }}
          />

        </View>
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            height: hp(5),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            borderRadius: wp(10),
            width: wp(30),
            backgroundColor: '#6650A4',
            justifyContent: 'center',
            marginTop: wp(0)

          }}>

          <Material name="search" size={20} color="white" />
          <View style={{ marginLeft: wp(1.5) }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: "600" }}> Search </Text>
          </View>


        </TouchableOpacity>

      </View>
      <View
        style={{
          marginTop: hp(1),
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
            visibilityy === 'Public' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Public')}>
          <Text style={styles.BtnText}>Public</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            visibilityy === 'Private' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Private')}>
          <Text style={styles.BtnText}>Private</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            visibilityy === 'Network' && styles.selectedButton,
          ]}
          onPress={() => handleVisibilityChange('Network')}>
          <Text style={styles.BtnText}>Network Only</Text>
        </TouchableOpacity>

      </View>

      {visibilityy === "Private" ? (
        <>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : (
            <View style={{ marginVertical: 10, marginHorizontal: 10, marginBottom: 110 }}>
              {console.log("this is private data", privateData)}
              {console.log("this is public data", publicData)}
              {console.log("this is network data", networkonlyData)}

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
                data={searchText.length > 0 ? filteredData : privateData}

                keyExtractor={item => item.promiseID.toString()}
                renderItem={renderItem}
              />
            </View>
          )}
        </>
      ) : (
        <>
          {visibilityy === "Public" ? (
            <>
              {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              ) : (
                <View style={{ marginVertical: 10, marginHorizontal: 10, marginBottom: 110 }}>
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
                    data={searchText.length > 0 ? filteredData : publicData}

                    keyExtractor={item => item.promiseID.toString()}
                    renderItem={renderItem}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              ) : (
                <View style={{ marginVertical: 10, marginHorizontal: 10, marginBottom: 110 }}>
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
                    data={searchText.length > 0 ? filteredData : networkonlyData}

                    keyExtractor={item => item.promiseID.toString()}
                    renderItem={renderItem}
                  />
                </View>
              )}
            </>
          )}
        </>
      )
      }
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
  },
  containerr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
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
    color: "white",
    fontWeight: '600'
  },
});

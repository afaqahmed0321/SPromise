import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  SafeAreaView,
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
import Ant from 'react-native-vector-icons/AntDesign';
import PromiseReaction from '../../Network/Users/NetworkFeed/PromiseReaction';
import PromiseComment from '../../Network/Users/NetworkFeed/AddCommentAPI';
import { RefreshControl } from 'react-native';
import DateRangePicker from 'rn-select-date-range';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchUser from '../../Network/Users/GetUser';
import { API_URL } from '../../../helper';

const NetworkFeed = ({ navigation }) => {
  const today = moment().format('YYYY-MM-DD');

  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedNetworkUserFee, setSelectedNetworkUserFee] = useRecoilState(selectedNetworkUserFeed);
  const [allData, setAllData] = useState(selectedNetworkUserFee)
  const [isViewAll, setIsViewAll] = useState([]);
  const [refersh, setrefresh] = useState(false);
  const [isModalV, setIsModalV] = useState(false)
  const focus = useIsFocused();
  const [userN, setUserN] = useRecoilState(UserNo);
  const [comment, setComment] = useState('');
  const [isnetworkModalVi, setIsnetworkModVi] = useRecoilState(IspromiseNetworkmodalVisible);
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibilityy, setVisibilityy] = useState('Private');
  const [dateRange, setDateRange] = useState({ firstDate: '', secondDate: '' });
  const [selectedRange, setRange] = useState({ firstDate: today, secondDate: today });
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Public");
  const [items, setItems] = useState([
    { label: 'Public', value: 'Public' },
    { label: 'Private', value: 'Private' },
    { label: 'Network Only', value: 'Network' },
  ]);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [resCode, setResCode] = useState();

  const [statusItems, setStatusItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Not In Effect', value: 'Not in Effect' },
    { label: 'In Effect', value: 'In Effect' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Failed', value: 'Failed' },
    { label: 'Rejected', value: 'Rejected' },
  ]);
  const myAllData = selectedNetworkUserFee
  const handelNetworkFeedComp = async () => {
    const networkUserNo = userN;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/getUserNetworkFeed?userNo=${networkUserNo}&visibility=${selectedItem}${selectedStatus == "All" ? '&All' : "&status="}${selectedStatus}&fromDate=${selectedRange.firstDate}&toDate=${selectedRange.secondDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("dataaaaa", data);
      setIsLoading(false);
      setFilteredData(data.promisesList);
      return data.promisesList;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const handleSubmit = () => {
    handelNetworkFeedComp();
    closeModal();
  };
  const onRefresh = () => {
    setrefresh(!refersh);
  };
  function handleSearch(text) {
    setSearchText(text);
    if (typeof text !== 'string') {

      return;
    }

    if (text.trim() === '') {
      setSearchedData(filteredData);
    } else {
      const filtered = filteredData.filter(item =>
        item.promiseGoal.toLowerCase().includes(text.toLowerCase())
      );
      setSearchedData(filtered);
    }
  };

  useEffect(() => {
    handelNetworkFeedComp();
  }, [focus, refersh]);

  const onHandelReaction = async (PID, LikeA) => {
    const userNN = userN;
    const containsPromiseId = LikeA.includes(userNN);
    const Reac = containsPromiseId ? "UnLike" : "Like";

    try {
      const res = await PromiseReaction(userNN, PID, Reac);

      // Update the filteredData state directly
      setFilteredData(prevData => {
        return prevData.map(item => {
          if (item.promiseID === PID) {
            const updatedReactions = containsPromiseId
              ? item.promiseReactions.filter(id => id !== userNN)
              : [...item.promiseReactions, userNN];

            return { ...item, promiseReactions: updatedReactions };
          }
          return item;
        });
      });
    } catch (error) {
      console.error('Error updating reaction:', error);
    }

  };

  const onHandelComment = async (promiseID) => {
    const email = await AsyncStorage.getItem('Email');
    let fullName = '';

    try {
      const res = await fetchUser(email);
      fullName = `${res.firstName} ${res.lastName}`;
    } catch (error) {
      console.error('Error fetching user:', error);
    }

    const userNo = await AsyncStorage.getItem('userNo');
    const newCommentValue = comment.trim();
    if (newCommentValue !== '') {
      const promiseComments = {
        promiseID: promiseID,
        userNo: userNo,
        newCommentValue: newCommentValue,
      };

      try {
        const res = await PromiseComment(userNo, promiseID, newCommentValue);
        if (res) {
          const updatedData = filteredData.map(item => {
            if (item.promiseID === promiseID) {
              return {
                ...item,
                promiseComments: [...item.promiseComments, {
                  comment: promiseComments.newCommentValue,
                  userName: fullName,
                  userImageURL: '', // Assuming userImageURL is empty for now
                }],
              };
            }
            return item;
          });
          setFilteredData(updatedData);
          setSearchedData(updatedData);
          setComment('');
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Failed to add comment. Please try again.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        ToastAndroid.showWithGravityAndOffset(
          'Failed to add comment. Please try again.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter a non-empty comment.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };



  const handleNextButtonPress = () => {
    setIsModalV(true);
  };
  const closeModal = () => {
    setIsModalV(false);
  };

  const renderItem = ({ item }) => {
    const userNN = userN;
    const setLike = item.promiseReactions;
    let newlike = 0;

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

    const handleLikeAction = async (promiseID) => {
      const PIDd = promiseID;
      const containsPromiseId = item.promiseReactions.includes(userN);
      const Reac = containsPromiseId ? "UnLike" : "Like";
      const res = await PromiseReaction(userN, PIDd, Reac);
      if (res.code === 100) {
        const index = filteredData.findIndex(promise => promise.promiseID === promiseID);
        if (index !== -1) {
          const updatedData = [...filteredData];
          if (containsPromiseId) {
            updatedData[index].promiseReactions = updatedData[index].promiseReactions.filter(id => id !== userN);
          } else {
            updatedData[index].promiseReactions.push(userN);
          }
          setFilteredData(updatedData);
        }
      }
    };

    const toggleText = () => {
      setShowFullText(!showFullText);
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
              source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}

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

          <View>
            <Text style={[
              {
                color: 'black',
                marginHorizontal: hp(1.2),
                marginTop: hp(1.2),
                fontSize: hp(1.8),
                backgroundColor: "#e0e0e0",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexShrink: 1,
                alignSelf: 'flex-start'
              },
            ]}>
              ${item.paymentAmount}
            </Text>
          </View>
          {item.rewardPoints > 0 && (
            <View>
              <Text style={[
                {
                  color: 'black',
                  marginHorizontal: hp(1.2),
                  marginTop: hp(1.2),
                  fontSize: hp(1.8),
                  backgroundColor: "#e0e0e0",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexShrink: 1,
                  alignSelf: 'flex-start'
                },
              ]}>
                {item.rewardPoints} pts
              </Text>
            </View>

          )}
          {item.ratingImpact != null && (
            <View>
              <Text style={[
                {
                  color: 'black',
                  marginHorizontal: hp(1.2),
                  marginTop: hp(1.2),
                  fontSize: hp(1.8),
                  backgroundColor: "#e0e0e0",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexShrink: 1,
                  alignSelf: 'flex-start'
                },
              ]}>
                Rating will impact
              </Text>
            </View>

          )}
          {item.displayStatus != null && (
            <View>
              <Text style={[
                {
                  color: 'black',
                  marginHorizontal: hp(1.2),
                  marginTop: hp(1.2),
                  fontSize: hp(1.8),
                  backgroundColor: "#e0e0e0",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: hp(1),
                  flexShrink: 1,
                  alignSelf: 'flex-start'
                },
              ]}>
                {item.displayStatus}
              </Text>
            </View>
          )}

        </View>


        <View>
          <Text
            style={{
              color: '#652D90',
              fontWeight: 'bold',
              fontSize: hp(1.9),
              marginHorizontal: hp(1.2),
              paddingHorizontal: hp(1),
              paddingTop: 10,
              justifyContent: "flex-start",
              textAlign: "start"
            }}
          >
            {showFullText ? item.promiseGoal : `${item.promiseGoal.slice(0, 90)}`}
          </Text>
          {item.promiseGoal.length > 90 && (
            <TouchableOpacity onPress={toggleText}>
              <Text style={{
                color: 'orange', fontWeight: 'bold', fontSize: hp(1.6), marginHorizontal: hp(1.2),
                paddingHorizontal: hp(1), textDecorationLine: "underline", margin: 0
              }}>
                {showFullText ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
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
                      source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}

                      style={{
                        width: wp(10),
                        height: hp(5),
                        borderRadius: wp(6.5),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "justify",
                      height: hp(4)

                    }}>
                    <Text style={{ color: "black" }}>{comment.userName}</Text>
                    <Text style={{ color: "black" }}>{comment.comment}</Text>
                  </View>
                </View>
              ))
          ) : (
            <Text style={{ color: "black", margin: hp(1.2) }}>No comments for this promise</Text>
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
            value={comment}
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
            }}>
            <Text style={{ color: "white" }}>Add Comment</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#E4EEE6',
          flex: 1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={handleNextButtonPress}
          style={[{
            marginVertical: 5, backgroundColor: '#652D90', paddingVertical: 10, borderRadius: 50, width: '40%', justifyContent: 'center',
            alignItems: 'center',
          }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
            <FontAw5 name="filter" size={16} color="#fff" />
            <Text style={{ color: 'white', textAlign: 'center', fontSize: hp(2) }}>Filter</Text>
          </View>
        </TouchableOpacity>
        {filteredData.length > 0 && (
          <View style={{ height: hp(6), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', width: '90%', borderWidth: 1, borderColor: '#652D90', borderRadius: 50, marginTop: 5
              }}>
                <FontAw5 name="search" size={24} color="#652D90" style={{ marginLeft: wp(3) }} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: hp(2),
                    paddingHorizontal: wp(2),
                    paddingVertical: hp(0.7),
                    color: 'black',
                  }}
                  placeholder="Search Promises"
                  placeholderTextColor="#652D90"
                  value={searchText}
                  onChangeText={text => handleSearch(text)}
                />
              </View>

            </TouchableOpacity>
          </View>
        )}
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <View style={{ marginVertical: 5, marginHorizontal: 10, marginBottom: 110 }}>
            {filteredData.length === 0 ? (
              <View style={{ width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: hp(1.8), textAlign: "center", color: 'grey' }}>No Data to Display. You can try applying a filter.</Text>
              </View>
            ) : (

              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handelNetworkFeedComp}
                    colors={['#E4A936', '#EE8347']}
                    tintColor="white"
                    title="Refreshing..."
                    titleColor="white"
                  />
                }
                data={searchedData.length ? searchedData : filteredData}
                keyExtractor={item => item.promiseID.toString()}
                renderItem={renderItem}
              />
            )}
          </View>
        )}


        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalV}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Select Date Range:</Text>
              <View>
                <SafeAreaView>
                  <View style={styles.container}>
                    <DateRangePicker
                      onSelectDateRange={(range) => {
                        setRange(range);
                      }}
                      blockSingleDateSelection={true}
                      responseFormat="YYYY-MM-DD"
                      selectedDateContainerStyle={[styles.selectedDateContainerStyle, { color: 'grey' }]}
                      selectedDateStyle={styles.selectedDateStyle}
                      monthYearTextStyle={styles.monthYearTextStyle}
                      dateTextStyle={styles.abc}
                      maxDate={moment().format('YYYY-MM-DD')}

                    />
                  </View>
                </SafeAreaView>
              </View>
              <Text style={styles.text}>
                Selected Range: {selectedRange.firstDate} - {selectedRange.secondDate}
              </Text>
              <DropDownPicker
                open={openDropdown}
                value={selectedItem}
                items={items}
                setOpen={setOpenDropdown}
                setValue={setSelectedItem}
                setItems={setItems}
                containerStyle={[
                  styles.dropdownContainer,
                  openDropdown ? { zIndex: 1000 } : { zIndex: 1 },
                ]}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                onValueChange={(value) => setSelectedItem(value)}
              />
              <DropDownPicker
                open={openStatusDropdown}
                value={selectedStatus}
                items={statusItems}
                setOpen={setOpenStatusDropdown}
                setValue={setSelectedStatus}
                setItems={setStatusItems}
                containerStyle={[
                  styles.dropdownContainer,
                  openStatusDropdown ? { zIndex: 1000 } : { zIndex: 1 },
                ]}
                placeholder="Select Status"
              />

              <View style={styles.buttonsGroup}>
                <View>
                  <TouchableOpacity onPress={closeModal} style={styles.button}>
                    <Text style={styles.BtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.BtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </>

  );
};

export default NetworkFeed;

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: wp(26),
  // },

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
    padding: hp(2),
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

  closeButton: {
    color: 'blue',
    fontSize: hp(1),
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: hp(1.8),
    marginBottom: 10,
  },
  dateRangeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateRangePicker: {
    width: '100%',
  },
  dropdownContainer: {
    zIndex: 1,
    width: '80%',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
  },
  button: {
    marginTop: 10,
    padding: hp(1),
    borderColor: 'gray',
    borderRadius: 5,
    width: wp(28),
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#652D90', // Button background color
  },
  BtnText: {
    textAlign: 'center',
    color: "white",
    fontWeight: '600'
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#652D90",
    borderRadius: 5,
    fontSize: hp(2),
    fontWeight: "800"

  },
  text: {
    fontSize: hp(1.8),
    marginBottom: 10,
    color: 'grey',
  },
  buttonsGroup: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthYearTextStyle: {
    fontSize: hp(2),
    fontWeight: "800"
  }
});

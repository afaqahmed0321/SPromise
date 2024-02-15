import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchUserData from '../Network/Users/GetUsers';
import {TextInP} from '../Styling/TextInput';
import {UserNo} from '../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import {ismodalVisible, refreshPromiseNetwork} from '../recoil/Globel';
import AddToMyNetwork from '../comp/MyNetwork/AddToMyNetwork';
import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {
  IspromiseNetworkmodalVisible,
  selectedNetworkUser,
  selectedNetworkUserFeed,
} from '../recoil/Users/UserNetwork/Network';
import NetWorkFeedApi from '../Network/Users/NetworkFeed/NetworkFeedAPi';
import EvilIcon from 'react-native-vector-icons/FontAwesome5';
import addRemoveFavouriteAPi from '../Network/Users/AddRemoveFavApi';

const PromiseNetwork = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNetworkUse, setSelectedNetworkUse] =
    useRecoilState(selectedNetworkUser);
  const [selectedNetworkUserFee, setSelectedNetworkUserFee] = useRecoilState(
    selectedNetworkUserFeed,
  );

  const handleSearch = () => {
    const filtered = userData.filter(
      item =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const focus = useIsFocused();
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(
    refreshPromiseNetwork,
  );
  const [isnetworkModalVi, setIsnetworkModVi] = useRecoilState(
    IspromiseNetworkmodalVisible,
  );

  const handelNetworkFeedComp = async item => {
    console.log(item);
    const networkUserNo = item;
    const res = await NetWorkFeedApi(networkUserNo);
    console.log(res, 'network User Feed');
    setSelectedNetworkUserFee(res);
    navigation.navigate('NetworkFeed');
  };

  const toggleFavorite = () => {
    // setIsFavorited(!isFavorited);
  };

  const handleRating = ratedValue => {
    setRating(ratedValue);
  };

  const uniqueUserData = userData.filter(
    (user, index, self) =>
      index === self.findIndex(u => u.emailID === user.emailID),
  );

  const renderStars = maxRating => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)}>
          <MaterialIcons
            name={i <= rating ? 'star' : 'star-border'}
            size={15}
            color={i <= rating ? '#652D90' : '#A9A9A9'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const fetchData = () => {
    fetchUserData(userN).then(data => {
      console.log(data, 'Network User: ');
      setUserData(data);
      setIsLoading(false);
    });
  };

  //  useFocusEffect(

  //     React.useCallback(() => {
  //       fetchData();
  //     }, [])
  //   );

  useEffect(() => {
    fetchData();
  }, [focus, refreshnetwork]);
  const handleBack = () => {
    navigation.goBack();
  }
  return (
   
    <View style={{backgroundColor: '#E4EEE6', flex: 1}} >
      <View style={{height: hp(7), flexDirection: 'row', alignItems: 'center'}}>
       {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={handleBack}
          style={{marginLeft: wp(6)}}>
          <EvilIcon name="arrow-alt-circle-left" size={30} color="#652D90" />
        </TouchableOpacity>
        )}
        <View style={{marginLeft: wp(6)}}>
        <Text style={{fontSize:hp(2.3), fontWeight:'bold',color:"#652D90"}}>
          Promise Network
        </Text>

        </View>
      </View>
      <View
        style={{
          height: hp(4),
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(3),
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

        <View style={{width: wp(79)}}>
          {/* <TextInput style={styles.SearchInpF} placeholder='Search User'>
        
        </TextInput>
        <TouchableOpacity
                style={{position: 'absolute', right: hp(1.8), top: hp(.8)}}>
                <Feather name="search" size={20} color="#8250A6" />
            </TouchableOpacity> */}

          <TextInput
            placeholder="Search by name"
            placeholderTextColor={'grey'}
            style={styles.SearchInpF}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearch(); // Trigger search on text change
            }}
          />
          {/* <TouchableOpacity onPress={handleSearch}
                style={{position: 'absolute', right: hp(1.8), top: hp(.8)}}>
                <Feather name="search" size={20} color="#8250A6" />
            </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => setMmodalVisible(true)}
          style={{
            height: hp(4),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(6),
          }}>
          <Ionicons name="person-add-outline" size={23} color="#652D90" />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setMmodalVisible(false)}>
            <AddToMyNetwork />
          </Modal>

          {/* <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
            {' '}
            Invite User
          </Text> */}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#652D90" />
        </View>
      ) : (
        <FlatList
          data={searchText.length > 0 ? filteredData : userData}
          keyExtractor={item => item.serialNo.toString()}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => handelNetworkFeedComp(item.networkUserNo)}
                style={{
                  flexDirection: 'row',
                  marginVertical: hp(1),
                  alignItems: 'center',
                  marginLeft: wp(3),
                }}>
                <View>
                  <Image
                    // source={{uri:item.imageURL}}
                    source={
                      item.imageURL === ''
                        ? {
                            uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                          }
                        : {uri: item.imageURL}
                    }
                    style={{
                      width: wp(12),
                      height: hp(6),
                      borderRadius: wp(12) / 2,
                      marginLeft: wp(2),
                    }}
                  />
                </View>
                <View style={{width: wp(49), marginLeft: wp(3)}}>
                  {item.networkUserName !== '' ? (
                    <Text style={{color:"black"}}>{item.networkUserName}</Text>
                  ) : null}
                </View>
                {/* <View style={styles.container}>{renderStars(5)}</View> */}
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      padding: 0.2,
                      borderRadius: 50,
                      position: 'absolute',
                      marginLeft: wp(20)
                    }}
                    onPress={() => {
                      const Value = item.isFavourite ? false : true;
                      console.log(Value);
                      const res = addRemoveFavouriteAPi(item.serialNo, Value);
                      setrefreshnetwork(!refreshnetwork);
                    }}>
                    {/* <View
                      style={{
                        padding: 0.2,
                        borderRadius: 50,
                        position: 'absolute',
                      }}> */}
                    {item.isFavourite == true ? (
                      <FontAwesome name="heart" size={15} color="#652D90" />
                    ) : (
                      <FontAwesome name="heart-o" size={15} color="#652D90" />
                    )}
                    {/* </View> */}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

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
    fontSize: hp(1),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:14,
    padding:0,
    height:hp(5),
  },
});

export default PromiseNetwork;

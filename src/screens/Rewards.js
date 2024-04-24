import React, { useEffect, useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchUserData from '../Network/Users/GetUsers';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { ismodalVisible, refreshPromiseNetwork } from '../recoil/Globel';
import AddToMyNetwork from '../comp/MyNetwork/AddToMyNetwork';
import { useIsFocused } from '@react-navigation/native';
import {
  IspromiseNetworkmodalVisible,
  selectedNetworkUser,
  selectedNetworkUserFeed,
} from '../recoil/Users/UserNetwork/Network';
import NetWorkFeedApi from '../Network/Users/NetworkFeed/NetworkFeedAPi';
import EvilIcon from 'react-native-vector-icons/FontAwesome5';
import addRemoveFavouriteAPi from '../Network/Users/AddRemoveFavApi';
import FetchRewards from '../Network/Users/GetRewards';
import axios from 'axios';
import { setDate } from 'date-fns';

const Rewards = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNetworkUse, setSelectedNetworkUse] =
    useRecoilState(selectedNetworkUser);
  const [selectedNetworkUserFee, setSelectedNetworkUserFee] = useRecoilState(
    selectedNetworkUserFeed,
  );


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

  const fetchData = async () => {
    console.log("user number from rewards", userN);
    const resp = axios.get(`https://snappromise.com:8080/api/Users/getNetworkUsersRewards?userNo=${userN}`)
    .then((response)=>{
      console.log("respppppppppppppp", response)
      setUserData(response.data.userRewards);
      setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  useEffect(() => {
    fetchData();
  }, [focus, refreshnetwork]);
  const handleBack = () => {
    navigation.goBack();
  }
  return (

    <View style={{ backgroundColor: '#E4EEE6', flex: 1 }} >
      <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center' }}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={handleBack}
            style={{ marginLeft: wp(6) }}>
            <EvilIcon name="arrow-alt-circle-left" size={30} color="#652D90" />
          </TouchableOpacity>
        )}
        <View style={{ marginLeft: wp(6) }}>
          <Text style={{ fontSize: hp(2.3), fontWeight: 'bold', color: "#652D90" }}>
            Rewards
          </Text>

        </View>
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#652D90" />
        </View>
      ) : (
        <FlatList
          data={searchText.length > 0 ? filteredData : userData}
          keyExtractor={item => item?.serialNo?.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => handelNetworkFeedComp(item?.networkUserNo)}
                style={{
                  flexDirection: 'row',
                  marginVertical: hp(1),
                  alignItems: 'center',
                  marginLeft: wp(3),
                }}>
                <View>
                  <Image
                    source={
                      item?.imageURL === ''
                        ? {
                          uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                        }
                        : { uri: item?.imageURL }
                    }
                    style={{
                      width: wp(12),
                      height: hp(6),
                      borderRadius: wp(12) / 2,
                      marginLeft: wp(2),
                    }}
                  />
                </View>
                <View style={{ width: wp(49), marginLeft: wp(3) }}>
                  {item.firstName !== '' ? (
                    <Text style={{ color: "black" }}>{item?.firstName} {item.lastName}</Text>
                  ) : null}

                  
                </View>



                <View style={{}}>
                <Text style={[
                      {
                        color: 'black',
                        marginLeft: hp(7),
                        fontSize: hp(1.8),
                        // backgroundColor: "#e0e0e0",
                        borderRadius: 50,
                        // paddingVertical: 5,
                        // paddingHorizontal: 10,
                        // marginHorizontal: 10

                      },
                    ]}>{item?.rewardPoints ? `${item?.rewardPoints} pts` : "0 pts"}
                    </Text>
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
    fontSize: 14,
    padding: 0,
    height: hp(5),
  },
});

export default Rewards;

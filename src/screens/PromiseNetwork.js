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
import fetchUserData, { removeUserNetwork } from '../Network/Users/GetUsers';
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
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const PromiseNetwork = ({ navigation }) => {
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

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const focus = useIsFocused();
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(
    refreshPromiseNetwork,
  );
  const [isnetworkModalVi, setIsnetworkModVi] = useRecoilState(
    IspromiseNetworkmodalVisible,
  );
  console.log("refreshPromiseNetwork", refreshnetwork)
  const fetchData = () => {
    fetchUserData(userN).then(data => {
      // Remove duplicates based on serialNo
      const uniqueData = [];
      const seenSerialNos = new Set();

      data.forEach(item => {
        if (!seenSerialNos.has(item.networkUserNo)) {
          uniqueData.push(item);
          seenSerialNos.add(item.networkUserNo);
        }
      });

      setUserData(uniqueData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [focus, refreshnetwork]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFavoriteAction = async (serialNo, isFavorite) => {
    const Value = isFavorite ? false : true;
    await addRemoveFavouriteAPi(serialNo, Value);
    const updatedData = userData.map(item =>
      item.serialNo === serialNo ? { ...item, isFavourite: Value } : item
    );
    setUserData(updatedData);
    setFilteredData(updatedData);
  };

  const removeNetworkUser = async (serialNo) => {
    await removeUserNetwork(serialNo);
    const updatedData = userData.filter(item => item.serialNo !== serialNo);
    setUserData(updatedData);
    setFilteredData(updatedData);
  };

  return (
    <View style={{ backgroundColor: '#E4EEE6', flex: 1 }}>
      <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center' }}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={handleBack} style={{ marginLeft: wp(6) }}>
            <EvilIcon name="arrow-alt-circle-left" size={30} color="#652D90" />
          </TouchableOpacity>
        )}
        <View style={{ marginLeft: wp(6) }}>
          <Text style={{ fontSize: hp(2.3), fontWeight: 'bold', color: "#652D90" }}>
            Promise Network
          </Text>
        </View>
      </View>
      <View style={{ height: hp(4), flexDirection: 'row', alignItems: 'center', marginLeft: wp(3) }}>
        <View style={{ width: wp(79) }}>
          <TextInput
            placeholder="Search by name"
            placeholderTextColor={'grey'}
            style={styles.SearchInpF}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearch();
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setMmodalVisible(true)}
          style={{ height: hp(4), flexDirection: 'row', alignItems: 'center', marginLeft: wp(6) }}>
          <Ionicons name="person-add-outline" size={30} color="#652D90" />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setMmodalVisible(false)}>
            <AddToMyNetwork />
          </Modal>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#652D90" />
        </View>
      ) : (
        <ScrollView>
          <FlatList
            style={{ marginVertical: hp(2) }}
            data={searchText.length > 0 ? filteredData : userData}
            keyExtractor={item => item.serialNo.toString()}
            renderItem={({ item }) => (
              <View style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: hp(1),
                marginHorizontal: hp(2.2),
                alignItems: 'center',
                justifyContent: "space-between"
              }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View>
                    <Image
                      source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}

                      style={{
                        width: wp(12),
                        height: hp(6),
                        borderRadius: wp(12) / 2,
                        marginLeft: wp(2),
                      }}
                    />
                  </View>
                  <View style={{ width: wp(49), marginLeft: wp(3) }}>
                    {item.networkUserName !== '' ? (
                      <Text style={{ color: "black", fontSize: hp(1.8) }}>{item.networkUserName}</Text>
                    ) : null}
                    <Text style={[
                      {
                        color: 'black',
                        fontSize: hp(1.6),
                      },
                    ]}>
                      Promisibility {item.promisibility ? `${item.promisibility}%` : "0%"}
                    </Text>
                  </View>
                </View>
                <View style={{ gap: 15, flexDirection: "row" }}>
                  <View>
                    <TouchableOpacity

                      onPress={() => handleFavoriteAction(item.serialNo, item.isFavourite)}
                    >
                      {item.isFavourite ? (
                        <FontAwesome name="heart" size={25} color="#652D90" />
                      ) : (
                        <FontAwesome name="heart-o" size={25} color="#652D90" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={{}}>
                    <TouchableOpacity

                      onPress={() => removeNetworkUser(item.serialNo)}
                    >
                      <FontAwesome name="trash" size={25} color="#652D90" />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )}
          />
        </ScrollView>
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
    paddingLeft: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: hp(1.8),
    padding: 0,
    height: hp(5),
  },
});

export default PromiseNetwork;


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
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRecoilState} from 'recoil';
import {
  isSelectModalVisible,
  selectedPromisee,
  UserNo,
} from '../../recoil/AddPromise';
import {ismodalVisible, refreshPromiseNetwork} from '../../recoil/Globel';
import AddToMyNetwork from '../MyNetwork/AddToMyNetwork';
import fetchUser from '../../Network/Users/GetUser';
import fetchUserData from '../../Network/Users/GetUsers';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Font from 'react-native-vector-icons/Fontisto';
import { RefreshControl } from 'react-native';


const SelectPromise = () => {
  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const [promisee, setPromisee] = useRecoilState(selectedPromisee);
  const [modalV, setModalV] = useRecoilState(isSelectModalVisible);
  const focus = useIsFocused();
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(
    refreshPromiseNetwork,
  );
  const [refersh, setrefresh] = useState(false);
  const onRefresh = () => {
    setrefresh(!refersh);
  };
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
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
      setUserData(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [focus, refreshnetwork, refersh]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.main}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: hp(2),
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: hp(2), fontWeight: 'bold',color: '#652D90'}}>My Promise Network</Text>
        
      </View>
      <View
        style={{
          height: hp(4),

          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(3),
        }}>
        

        <View style={{width: wp(79)}}>
          <TextInput
            style={styles.SearchInpF}
            placeholder="Search User" placeholderTextColor="#652D90"></TextInput>
          <TouchableOpacity
            style={{position: 'absolute', right: hp(1.8), top: hp(0.8)}}>
            <Feather name="search" size={20} color="#8250A6" />
          </TouchableOpacity>
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
            onRequestClose={modalVisible}>
            <AddToMyNetwork />
          </Modal>

          
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          // data={userData}
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
          data={uniqueUserData}
          keyExtractor={item => item.emailID.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setPromisee(item), setModalV(false);
              }}
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
                          uri: 'https://th.bing.com/th/id/OIP.aWYpRbe6Tbsr_1W42rUwVAAAAA?rs=1&pid=ImgDetMain',
                        }
                      : {uri: item.imageURL}
                  }
                  style={{
                    width: wp(12),
                    height: hp(6),
                    borderRadius: wp(12) / 2,
                    marginLeft: wp(4),
                  }}
                />
              </View>
              <View style={{width: wp(48), marginLeft: wp(3)}}>
                {item.name !== '' ? (
                  <Text style={{color: 'grey', fontWeight: 'bold'}}>
                    {item.firstName} {item.lastName}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {backgroundColor: '#E4EEE6', flex: 1},
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
    borderRadius: wp(12) / 2,
    marginTop: wp(0.5),
  },
  SearchInpF: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    fontSize: hp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
    paddingVertical : 0,
    marginVertical: 0,
    height : wp(9.5),
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default SelectPromise;

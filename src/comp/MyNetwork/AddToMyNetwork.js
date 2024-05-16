import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/Fontisto';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import fetchUser from '../../Network/Users/GetUser';
import { commonStyles } from '../../Styling/buttons';
import InviteUser from '../../Network/Users/InviteUser';
import AddUserNetwork from '../../Network/Users/AddToNetwork';
import { UserNo } from '../../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { ismodalVisible, refreshPromiseNetwork } from '../../recoil/Globel';
import { BlurView } from '@react-native-community/blur';

const AddToMyNetwork = () => {
  const [userFound, setUserFound] = useState(null);
  const [searching, setSearching] = useState(null);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(refreshPromiseNetwork);

  const SearchUser = async () => {
    if (email === '') {
      ToastAndroid.show('Please enter an email address', ToastAndroid.LONG);
      setSearching(false);
      setUserFound(null);
      return;
    }

    setIsLoading(true);
    setSearching(true);
    const mail = email.toLowerCase();

    try {
      const data = await fetchUser(mail);
      console.log(data, 'data');
      setIsLoading(false);

      if (data === 'User Does not Exist') {
        setUserFound(false);
        handelInviteUser();
      } else {
        setUserFound(true);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      ToastAndroid.show('Error fetching user data.', ToastAndroid.LONG);
      setIsLoading(false);
      setSearching(false);
    }
  };

  const handelInviteUser = async () => {
    if (email == '') {
      ToastAndroid.show('Please enter email address', ToastAndroid.LONG);
    } else {
      await InviteUser(email);
      ToastAndroid.show('User Does not Exist! Invite has been sent', ToastAndroid.LONG);
    }
  };

  const handelAddtoNetwork = async () => {
    if (!userData.userNo) {
      ToastAndroid.show('No user found to add to network.', ToastAndroid.LONG);
      return;
    }

    const AddUserN = userData.userNo;

    try {
      await AddUserNetwork(AddUserN, userN);
      setrefreshnetwork(!refreshnetwork);
    } catch (error) {
      console.error('Error adding user to network:', error);
      ToastAndroid.show('Error adding user to network.', ToastAndroid.LONG);
    }
  };

  return (
    <>
      <BlurView style={{ height: hp(25) }} blurType="light" blurAmount={10} />
      <View style={{ flexDirection: 'row' }}>
        <BlurView style={{ flex: 1 }} blurType="light" blurAmount={10} />
        <View
          style={{
            height: hp(40),
            backgroundColor: '#E4EEE6',
            alignItems: 'center',
            borderWidth: 0.5,
            width: wp(90),
            alignSelf: 'center',
            borderRadius: wp(2),
            borderColor: '#652D90',
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: hp(1), right: wp(3) }}
            onPress={() => setMmodalVisible(false)}
          >
            <Font color="#652D90" name="close" size={30} />
          </TouchableOpacity>
          <View style={{ width: wp(79), marginTop: hp(8) }}>
            <TextInput
              style={styles.SearchInpF}
              placeholder="Search User"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setUserData([]);
              }}
            />
            <TouchableOpacity
              onPress={SearchUser}
              style={{ position: 'absolute', right: hp(1.8), top: hp(1.8) }}
            >
              <Feather name="search" size={20} color="#8250A6" />
            </TouchableOpacity>
          </View>
          <View style={{ height: hp(8), marginTop: hp(2) }}>
            {userData && userData.emailID && (
              <View>
                <Text style={{ color: 'black' }}>Email: {userData.emailID}</Text>
                <Text style={{ color: 'black' }}>
                  Name: {userData.firstName} {userData.lastName}
                </Text>
                <Text style={{ color: 'black' }}>
                  Promisibility: {userData.promisibility}
                </Text>
              </View>
            )}
          </View>
          <View style={{ marginBottom: hp(2) }}></View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : !searching ? null : userFound ? (
            <TouchableOpacity
              style={styles.SignBtn}
              onPress={handelAddtoNetwork}
            >
              <Text style={{ color: 'white' }}>Add to network</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <BlurView style={{ flex: 1 }} blurType="light" blurAmount={10} />
      </View>
      <BlurView style={{ height: hp(30) }} blurType="light" blurAmount={10} />
    </>
  );
};

export default AddToMyNetwork;

const styles = StyleSheet.create({
  SearchInpF: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    fontSize: hp(1),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
    fontSize: hp(1.5),
  },
  InviteBtn: {
    width: wp(60),
    backgroundColor: '#EE8347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  SignBtn: {
    width: wp(60),
    backgroundColor: '#2E888C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(5),
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

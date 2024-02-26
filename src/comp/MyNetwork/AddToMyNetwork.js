import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/Fontisto';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import fetchUser from '../../Network/Users/GetUser';
import {commonStyles} from '../../Styling/buttons';
import InviteUser from '../../Network/Users/InviteUser';
import AddUserNetwork from '../../Network/Users/AddToNetwork';
import {UserNo} from '../../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import {ismodalVisible, refreshPromiseNetwork} from '../../recoil/Globel';
import {BlurView} from '@react-native-community/blur';

const AddToMyNetwork = () => {
  const [userFound, setUserFound] = useState(null);
  const [searching, setSearching] = useState(null);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(
    refreshPromiseNetwork,
  );

  const SearchUser = async () => {
    if (email == '') {
      ToastAndroid.show('Please Enter Email', ToastAndroid.LONG);
    } else {
      setIsLoading(true);
      setSearching(true);
      const mail = email.toLowerCase();
      const res = await fetchUser(mail)
        .then(data => {
          console.log(data, 'data');
          if (data == 'User Does not Exist') {
            ToastAndroid.show(
              'User Does not Exist! Please click Invite to send Invitation',
              ToastAndroid.LONG,
            );
            setUserFound(false);
            setIsLoading(false);
            // setSearching(false);
          } else {
            setUserFound(true);
            setIsLoading(false);
            // setSearching(false);
            setUserData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching daa:', error);
          reject(error);
        });
    }
  };

  const handelAddtoNetwork = async () => {
    const AddUserN = await userData.userNo;
    const UserEmailID = await userData.emailID;

    console.log(userData);
    if (!AddUserN) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter the email address and search the user',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      const AddUserN = userData.userNo;
      const UserEmailID = userData.emailID;
      console.log(AddUserN);
      const res = await AddUserNetwork(AddUserN, userN);
      setrefreshnetwork(!refreshnetwork);
    }
  };
  const handelInviteUser = async () => {
    if (email == '') {
      ToastAndroid.show('Please enter email address', ToastAndroid.LONG);
    } else {
      const res = await InviteUser(email).then(data => {
        ToastAndroid.showWithGravityAndOffset(
          'An invite has been sent to ' + email,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
    }
  };

  useEffect(() => {
    setSearching(false);
  }, [email]);

  return (
    <>
      {/* <View style={{height: hp(25), borderWidth:1}}> */}
      <BlurView
        style={{height: hp(25),}}
        blurType="light" // You can customize the blurType as needed
        blurAmount={10} // You can adjust the blurAmount as needed
      ></BlurView>
      {/* </View> */}
      <View style={{flexDirection: 'row'}}>
        <BlurView
          style={{flex: 1}}
          blurType="light" // You can customize the blurType as needed
          blurAmount={10} // You can adjust the blurAmount as needed
        ></BlurView>
        <View
          style={{
            // width: wp(100),
            height: hp(40),
            backgroundColor: '#E4EEE6',
            // justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            width: wp(90),
            alignSelf: 'center',
            borderRadius: wp(2),
            borderColor: '#652D90',
            // marginHorizontal:wp(3),
            // height: hp(58),
            // marginTop: hp(20),
            // backgroundColor:'white',
           
           
          }}>
          <TouchableOpacity
            style={{position: 'absolute', top: hp(1), right: wp(3)}}
            onPress={() => setMmodalVisible(false)}>
            <Font color="#652D90" name="close" size={30} />
          </TouchableOpacity>
          <View style={{width: wp(79), marginTop: hp(8)}}>
            <TextInput
              style={styles.SearchInpF}
              placeholder="Search User"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setUserData([]);
              }}></TextInput>
            <TouchableOpacity
              onPress={SearchUser}
              style={{position: 'absolute', right: hp(1.8), top: hp(1.8)}}>
              <Feather name="search" size={20} color="#8250A6" />
            </TouchableOpacity>
          </View>
          <View style={{height: hp(8), marginTop: hp(2)}}>
            {userData && userData.emailID && (
              <View>
                <Text style={{color:"black"}}>Email: {userData.emailID}</Text>
                <Text  style={{color:"black"}}>
                  Name: {userData.firstName} {userData.lastName}
                </Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: hp(2)}}></View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : !searching ? null : userFound ? (
            <TouchableOpacity
              style={styles.SignBtn}
              onPress={handelAddtoNetwork}>
              <Text  style={{color:"white"}}>Add to network</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.InviteBtn}
              onPress={handelInviteUser}>
              <Text>Invite</Text>
            </TouchableOpacity>
          )}
        </View>
        <BlurView
          style={{flex: 1}}
          blurType="light" // You can customize the blurType as needed
          blurAmount={10} // You can adjust the blurAmount as needed
        ></BlurView>
      </View>
      <BlurView
        style={{ height:hp(30)}}
        blurType="light" // You can customize the blurType as needed
        blurAmount={10} // You can adjust the blurAmount as needed
      ></BlurView>
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

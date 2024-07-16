import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Mati from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import { useRecoilState } from 'recoil';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import { useNavigation } from '@react-navigation/native';
import { isLeftDrawerV } from '../recoil/HomeScreenStates';
import { UserNo, token } from '../recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uemail } from '../recoil/Users/GetUsers';
import { BlurView } from '@react-native-community/blur';
import ChangeSubscriptionModal from './ChangeSubscriptionModal';
import updateSubscriptionType from '../Network/Users/updateSubscriptionType';
import WebView from 'react-native-webview';
import axios from 'axios';

const Drawer = () => {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);
  const [Token, setToken] = useRecoilState(token);
  const [email, setemail] = useRecoilState(uemail);
  const [subscription, setSubscription] = useState();
  const [name, setname] = useState('');
  const [subURL, setSubURL] = useState('');

  const [userN, setUserN] = useRecoilState(UserNo);

  const navigation = useNavigation();

  useEffect(() => {
    getitem();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubscriptionChange = () => {
    setIsModalVisible(true);
  };

  const manageSubscription = async ()=> {

   const response =  await axios.get(`https://snappromise.com:8080/getCustomerPortalURL?UserNo=${userN}`)
   .then((response)=>{
    navigation.navigate('CustomWebView', { uri: response.data.url });

    setSubURL(response.data.url);
   }).catch((err)=>{
    console.log("this is error", err);
   })
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmSubscriptionChange = async () => {
    const response = await updateSubscriptionType(userN, 'Paid');
    if (response.status == 200) {
      logout();
    }
  };


  const getitem = async () => {
    let Name = await AsyncStorage.getItem('Name');
    let Email = await AsyncStorage.getItem('Email');
    let Subscription = await AsyncStorage.getItem('Subscription');
    setemail(Email);
    setname(Name);
    setSubscription(Subscription);
  };

  const logout = async () => {
    console.log('Logging Out');
    try {
      await AsyncStorage.clear();
      setToken('');
      setIsDrawerV(false);
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleOverlayPress = () => {
    setIsDrawerV(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.Main}>
        <TouchableOpacity style={styles.user}>
          <View
            style={{
              width: wp(90),
              height: hp(7),
              borderRadius: wp(9),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: wp(10),
                height: wp(10),
                borderRadius: wp(6.5),
                marginLeft: wp(2),
              }}
            >
              <Image
                source={{
                  uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                }}
                style={{
                  width: hp(5),
                  height: hp(5),
                  borderRadius: wp(6.5),
                }}
              />
            </View>
            <View style={{ marginLeft: wp(2) }}>
              <Text style={{ color: '#6650A4', fontSize:hp(1.8), fontWeight:'bold' }}>{email}</Text>
            </View>
          </View>

        </TouchableOpacity>

        <View style={{ marginHorizontal: wp(5), marginTop: wp(1) }}>
          <View style={[styles.listContainer]}>
            <Mati color="#652D90" name="account" size={30} style={{ marginTop: wp(1)}} />
            <TouchableOpacity
              onPress={() => {
                setIsDrawerV(false);
                navigation.navigate('UserProfile');
              }}
            >
              <Text style={[styles.TebText]}>User Profile</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => {
                navigation.navigate('Notifications')
                setIsDrawerV(false);
              }}
            >
              <MaterialIcons
                color="#652D90"
                name="notifications"
                size={30}
                style={{ marginTop: wp(1) }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Notifications</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => {
                navigation.navigate('PromiseNetwork')
                setIsDrawerV(false);
              }}
            >
              <MaterialIcons
                color="#652D90"
                name="groups"
                size={30}
                style={{ marginTop: wp(1) }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Promise Network</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => {
                navigation.navigate('Rewards')
                setIsDrawerV(false);
              }}
            >
              <MaterialIcons
                color="#652D90"
                name="stars"
                size={30}
                style={{ marginTop: wp(1) }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Rewards</Text>
            </TouchableOpacity>
          </View>

          {subscription !== 'Paid' ? (
            <View>
              <TouchableOpacity
                style={styles.listContainer}
                onPress={handleSubscriptionChange}
              >
                <MaterialIcons
                  color="#652D90"
                  name="credit-card"
                  size={30}
                  style={{ marginTop: wp(1) }}
                />
                <Text style={[styles.TebText, { padding: 3 }]}>Change Subscription</Text>
                {isModalVisible ? (
                  <ChangeSubscriptionModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmSubscriptionChange}
                  />
                ) : (
                  null
                )
                }
              </TouchableOpacity>
            </View>
          ) : (
            <SafeAreaView>
            <View>
              <TouchableOpacity
                style={styles.listContainer}
                onPress={manageSubscription}
              >
                <MaterialIcons
                  color="#652D90"
                  name="credit-card"
                  size={30}
                  style={{ marginTop: wp(1) }}
                />
                <Text style={[styles.TebText, { padding: 3 }]}>Manage Subscription</Text>
                {isModalVisible ? (
                  <ChangeSubscriptionModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmSubscriptionChange}
                  />
                ) : (
                  null
                )
                }
              </TouchableOpacity>
            </View>
            </SafeAreaView>
          )}


          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => {
                navigation.navigate('ReportIssues')
                setIsDrawerV(false);
              }}
            >
              <MaterialIcons
                color="#652D90"
                name="report"
                size={30}
                style={{ marginTop: wp(1) }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Report Issues</Text>
            </TouchableOpacity>
          </View>

        </View>


        <TouchableOpacity
          style={[styles.listContainer, { position: 'absolute', bottom: 0,  marginLeft: hp(2) }]}
          onPress={() => logout()}
        >
          <MaterialIcons
            style={{ marginLeft: hp(1), marginTop: wp(1.1) }}
            color="#652D90"
            name="logout"
            size={25}
          />
          <Text style={[styles.TebText, { padding: 3 }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <BlurView style={{ flex: 1 }} blurType="light" blurAmount={10} />
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Main: {
    backgroundColor: '#E4EEE6',
    width: wp(80),
    height: "100%",
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  user: {
    marginTop: hp(1),
    backgroundColor: '#E8DDFF',
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(7.5),
  },
  TebText: {
    marginLeft: wp(3),
    color: '#6650A4',
    fontSize: hp(2.2),
    marginTop: wp(1),
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

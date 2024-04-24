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

const Drawer = () => {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);
  const [Token, setToken] = useRecoilState(token);
  const [email, setemail] = useRecoilState(uemail);
  const [name, setname] = useState('');
  const [userN, setUserN] = useRecoilState(UserNo);

  const navigation = useNavigation();

  useEffect(() => {
    getitem();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubscriptionChange = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmSubscriptionChange = async () => {
    const response = await updateSubscriptionType(userN, 'Paid');
    console.log("response for subscription type", response);
    if(response.status == 200){
      logout();
    }
  };


  const getitem = async () => {
    let Name = await AsyncStorage.getItem('Name');
    let Email = await AsyncStorage.getItem('Email');
    setemail(Email);
    setname(Name);
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
                width: wp(13),
                height: hp(6),
                borderRadius: wp(6.5),
                marginLeft: wp(2),
                marginTop: hp(1),
              }}
            >
              <Image
                source={{
                  uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                }}
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5),
                }}
              />
            </View>
            <View style={{ width: wp(58), marginLeft: wp(3) }}>
              <Text style={{ color: '#6650A4', width: wp(65) }}>{email}</Text>
            </View>
          </View>

        </TouchableOpacity>

        <View style={{ marginHorizontal: wp(5), marginTop: 10 }}>
          <View style={[styles.listContainer, { paddingVertical: 1 }]}>
            <Mati color="#652D90" name="account" size={30} style={{ marginTop: 6, marginLeft: wp(-1) }} />
            <TouchableOpacity
              onPress={() => {
                setIsDrawerV(false);
                navigation.navigate('UserProfile');
              }}
            >
              <Text style={[styles.TebText, { padding: 1 }]}>User Profile</Text>
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
                style={{ marginTop: 8 }}
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
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>My Network</Text>
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
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Rewards</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={handleSubscriptionChange}
            >
              <MaterialIcons
                color="#652D90"
                name="credit-card"
                size={30}
                style={{ marginTop: 8 }}
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

        </View>


        <TouchableOpacity
          style={[styles.listContainer, { position: 'absolute', bottom: 20, marginLeft: 20 }]}
          onPress={() => logout()}
        >
          <MaterialIcons
            style={{ marginLeft: 5, marginTop: 10 }}
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
    height: hp(100),
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
    height: hp(10),
  },
  TebText: {
    marginLeft: wp(3),
    color: '#6650A4',
    fontSize: hp(2.5),
    marginTop: 7,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

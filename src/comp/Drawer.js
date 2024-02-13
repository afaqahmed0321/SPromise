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
import { token } from '../recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uemail } from '../recoil/Users/GetUsers';
import { BlurView } from '@react-native-community/blur';

const Drawer = () => {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);
  const [Token, setToken] = useRecoilState(token);
  const [email, setemail] = useRecoilState(uemail);
  const [name, setname] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getitem();
  }, []);

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
        {/* <TouchableOpacity
          onPress={() => setIsDrawerV(false)}
          style={{ marginLeft: wp(6), marginTop: hp(1) }}
        >
          <Fontisto color="#652D90" name="close" size={30} />
        </TouchableOpacity> */}

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
              <Text style={{ color: '#6650A4' }}>{name}</Text>
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
              <Text style={[styles.TebText, { padding: 1 }]}>Your Account</Text>
            </TouchableOpacity>
          </View>


          {/* <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('BraintreeDropInUI')}
            >
              <MaterialIcons
                color="#652D90"
                name="payments"
                size={30}
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Payment Methods</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.listContainer, { marginLeft: wp(1) }]}
            onPress={() => navigation.navigate('TransactionsHistory')}
          >

            <FontAw5 color="#652D90" name="file-invoice-dollar" size={23} style={{ marginTop: 8 }} />
            <Text style={styles.TebText}>  Transaction History</Text>
          </TouchableOpacity>


          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('')}
            >
              <MaterialIcons
                color="#652D90"
                name="favorite"
                size={30}
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Favorites</Text>
            </TouchableOpacity>
          </View> */}


          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('Notifications')}
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


          {/* <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('')}
            >
              <MaterialIcons
                color="#652D90"
                name="equalizer"
                size={30}
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Your Statistics</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('')}
            >
              <MaterialIcons
                color="#652D90"
                name="help"
                size={30}
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Help and FAQs</Text>
            </TouchableOpacity>
          </View>


          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('')}
            >
              <MaterialIcons
                color="#652D90"
                name="headphones"
                size={30}
                style={{ marginTop: 8 }}
              />
              <Text style={[styles.TebText, { padding: 3 }]}>Tech Support</Text>
            </TouchableOpacity>
          </View> */}

          <View>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => navigation.navigate('PromiseNetwork')}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    width: wp(80),
    height: hp(100),
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    // padding: 20,
    // marginTop: hp(3)
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
    // borderWidth: wp(.3),
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
    backgroundColor: 'transparent', // You can set a semi-transparent color here
  },
});

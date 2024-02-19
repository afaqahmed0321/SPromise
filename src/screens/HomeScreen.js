import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Notifications from './Notifications';

import { useRecoilState } from 'recoil';

import { isLeftDrawerV } from '../recoil/HomeScreenStates';

import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInP } from '../Styling/TextInput';
import { Headings } from '../Styling/Headings';
import HomePageDataSection from '../comp/HomePageDataSection';
import Drawer from '../comp/Drawer';
import { UserNo, token } from '../recoil/AddPromise';
import HomeCarousel from '../comp/HomeCarousel';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { BlurView } from '@react-native-community/blur';
import GetVideoSize from '../Network/GetVideoSize';
import GetAllowedVideoFormats from '../Network/GetVideoFarmats';
import { AllowedVideoFormatsState, AllowedVideoSizeState } from '../recoil/Globel';

const HomeScreen = ({ navigation }) => {
  const [accToken, setAc] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);

  const [VideoFarmats, setVideoFarmats] = useRecoilState(AllowedVideoFormatsState);
  const [VideoSize, setVideoSize] = useRecoilState(AllowedVideoSizeState);

  const fetchAppSettings = async () => {
    //    setVideoFarmats([])
    // setVideoSize(null)
    const getVideoSize = await GetVideoSize();
    const vSiz = getVideoSize[0]?.value || '';
    console.log(vSiz, "Video size")

    setVideoSize(vSiz);

    const getVideoFormats = await GetAllowedVideoFormats();
    console.log(getVideoFormats, "Video formats")
    const extractedValue = getVideoFormats[0]?.value || '';
    console.log(extractedValue, "Extracted value")
    setVideoFarmats(prevVideoFormats => [...prevVideoFormats, ...extractedValue.split(',')]);

    console.log('Video Formats Array:', VideoFarmats);

  }

  useEffect(() => {
    // setVideoFarmats(null)
    // setVideoSize(null)
    fetchAppSettings();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#e4eee6',
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <View style={{}}>
        <View style={{ marginTop: hp(1), marginLeft: wp(1), flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp(2), alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setIsDrawerV(true)}>
            <MaterialComunityIcons
              name="menu"
              color="black"
              size={40}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isDrawerV}
            onRequestClose={() => setIsDrawerV(false)}>

            <Drawer />

          </Modal>

          {/*  */}

          <View style={styles.LogoC}>
            <Image
              source={require('../source/mainLogo.jpg')}
              style={styles.ImageStyle}
            />
          </View>

          <TouchableOpacity style={{ marginRight: wp(3.5) }} onPress={() => navigation.navigate("Notifications")}>
            <Ionicons
              name="notifications-outline"
              color="black"
              size={30}
            />
          </TouchableOpacity>

        </View>


        {/* Status Sections */}
        <View style={{ marginTop: hp(3) }}>
          <HomePageDataSection />
          <View style={{ marginRight: wp(2) }}>
            <View style={styles.bar}>

            </View>
            <View style={{ height: hp(35) }}>

            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  LogoC: {
    width: hp(6),
    height: hp(6),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  ImageStyle: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
  bar: {
    height: hp(3),
    width: '100%',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(1),
  },
  barText: {
    fontSize: hp(1.5),
    marginRight: wp(5),
    color: '#652D90',
    fontWeight: 'bold',
  },
  HomeCarousel: {
    // width: wp(70),
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    // width:wp(95)
  },
  SearchInpF: {
    backgroundColor: '#D6D5D5',
    borderRadius: wp(5),
    fontSize: hp(1),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(13),
  },
});

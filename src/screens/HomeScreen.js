import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
import HomePageDataSection from '../comp/HomePageDataSection';
import Drawer from '../comp/Drawer';
import { UserNo, token } from '../recoil/AddPromise';
import GetVideoSize from '../Network/GetVideoSize';
import GetAllowedVideoFormats from '../Network/GetVideoFarmats';
import { AllowedVideoFormatsState, AllowedVideoSizeState } from '../recoil/Globel';
import { Text } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [accToken, setAc] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);

  const [VideoFarmats, setVideoFarmats] = useRecoilState(AllowedVideoFormatsState);
  const [VideoSize, setVideoSize] = useRecoilState(AllowedVideoSizeState);

  const fetchAppSettings = async () => {
    const getVideoSize = await GetVideoSize();
    const vSiz = getVideoSize[0]?.value || '';

    setVideoSize(vSiz);

    const getVideoFormats = await GetAllowedVideoFormats();
    const extractedValue = getVideoFormats[0]?.value || '';
    setVideoFarmats(prevVideoFormats => [...prevVideoFormats, ...extractedValue.split(',')]);
  }

  useEffect(() => {
    fetchAppSettings();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#e4eee6',
        height: '100%',
      }}>
      <View style={{}}>
        <View style={{marginHorizontal:hp(2), marginTop:hp(2),  flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center' }}>
          <View>
            <TouchableOpacity onPress={() => setIsDrawerV(true)}>
              <MaterialComunityIcons
                name="menu"
                color="black"
                size={40}
              />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isDrawerV}
              onRequestClose={() => setIsDrawerV(false)}>
              <Drawer />
            </Modal>
          </View>
          <View style={styles.LogoC}>
            <Image
              source={require('../source/mainLogo.jpg')}
              style={styles.ImageStyle}
            />
            <Text style={styles.heading} >SNAPPROMISE</Text>
          </View>
          <View>
            <TouchableOpacity  onPress={() => navigation.navigate("Notifications")}>
              <Ionicons
                name="notifications-outline"
                color="black"
                size={30}
              />
            </TouchableOpacity>
          </View>

        </View>
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
    flexDirection: 'row',
    alignItems: "center",

  },
  heading: {
    fontSize: hp(2.25),
    fontWeight: 800,
    marginHorizontal: hp(1)
  },
  ImageStyle: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
  bar: {
    height: hp(3),
    width: '100%',
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

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import LogoHeader from '../comp/LogoHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { commonStyles } from '../Styling/buttons';
import LinearGradient from 'react-native-linear-gradient';
import { TextInP } from '../Styling/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLeftDrawerV } from '../recoil/HomeScreenStates';
import { useRecoilState } from 'recoil';

const AppLaunchScreen = ({ navigation }) => {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);
  const [JWTToken, setJWTToken] = useState('');
  const fetchToken = async () => {
    const Token = await AsyncStorage.getItem('token');
    setJWTToken(Token);
  }
  useEffect(() => {
    fetchToken();
    setIsDrawerV(false);
  }, [])
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginTop: hp(9) }}>
        <LogoHeader />
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          width: wp(70),
        }}>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} disabled={JWTToken !== null ? true : false}>
          <LinearGradient
            colors={['#E4A936', '#EE8347']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={commonStyles.lognBtn}
          >
            <Text style={TextInP.LogInButton}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} disabled={JWTToken !== null ? true : false}>
          <LinearGradient
            colors={['#73B6BF', '#2E888C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={commonStyles.SignUpBtn}
          >
            <Text style={TextInP.SignInButton}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppLaunchScreen;
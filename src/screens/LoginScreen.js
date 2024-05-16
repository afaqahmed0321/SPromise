import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Headings } from '../Styling/Headings';
import { TextInP } from '../Styling/TextInput';
import {
  useRecoilState,
} from 'recoil';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/Ionicons';
import { commonStyles } from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { login, Sociallogin } from '../Network/LoginApi';
import { UserNo, token } from '../recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uemail } from '../recoil/Users/GetUsers';
import fetchUser from '../Network/Users/GetUser';
import LoadingOverlay from '../comp/Global/LoadingOverlay';

const LoginScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Token, setToken] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [email, setemail] = useRecoilState(uemail);
  const [isLoading, setIsLoading] = useState(false);
  const [firstUrl, setFirstUrl] = useState('');
  const [secondUrl, setSecondUrl] = useState('');


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  GoogleSignin.configure({
    webClientId:
      '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com',
  });

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  }


  async function onGoogleButtonPress() {
    setIsLoading(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(async user => {
        let person = await fetchUser(user.user.email);
        if (person == 'User Does not Exist') {
          ToastAndroid.show('User does not exist', ToastAndroid.LONG);
        } else {
          const mail = user?.user?.email.toLowerCase();
          let response = await Sociallogin(mail, true);
          const paymentStatus = response.paymentPending;
          const userNumber = response.userNo;

          if (response.message === 'Success') {
            if (!paymentStatus) {
              setToken(response.token);
              setUserN(response.userNo);
              setemail(user.user.email);
              let resp = await fetchUser(user.user.email);
              await AsyncStorage.setItem('token', response.token);
              await AsyncStorage.setItem('userNo', response.userNo);
              await AsyncStorage.setItem('Email', user.user.email);
              await AsyncStorage.setItem('Name', user.user.displayName);
              navigation.navigate('LoginScreen');
            } else {
              try {

                const response = await fetch(`https://snappromise.com:8080/getCustomerPortalURL?UserNo=${userNumber}`, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });

                const data = await response.json();
                setFirstUrl(data.url);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
              if (firstUrl) {
                navigation.navigate('CustomWebView', { uri: firstUrl });

              } else {
                try {
                  const response = await fetch(`https://snappromise.com:8080/getCheckOutURL`, {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  });
                  const data = await response.json();
                  const updatedUrl = `${data.url}?prefilled_email=${mail}`;
                  setSecondUrl(updatedUrl);
                  navigation.navigate('CustomWebView', { uri: updatedUrl });
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              }
            }

          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }

const LoginPress = async () => {
  try {
    if (Email == '') {
      ToastAndroid.show('Please Enter Email', ToastAndroid.LONG);
    } else if (Password == '') {
      ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
    } else {
      setIsLoading(true); 
      const mail = Email.toLowerCase();
      let response = await login(mail, Password);
      const paymentStatus = response.paymentPending;
      const userNumber = response.userNo;
      await AsyncStorage.setItem('Subscription', response.subscription)
      setIsLoading(false); 
      if (response.message === 'Success') {

        if (!paymentStatus) {
          setToken(response.token);
          setUserN(response.userNo);
          setemail(Email);
          let resp = await fetchUser(Email);
          await AsyncStorage.setItem('token', '');
          await AsyncStorage.setItem('userNo', '');
          await AsyncStorage.setItem('Email', '');
          await AsyncStorage.setItem('Name', '');
          await AsyncStorage.setItem('token', response.token);
          await AsyncStorage.setItem('userNo', response.userNo);
          await AsyncStorage.setItem('Email', Email);
          await AsyncStorage.setItem(
            'Name',
            resp.firstName + ' ' + resp.lastName,
          );
        } else {
          try {

            const response = await fetch(`https://snappromise.com:8080/getCustomerPortalURL?UserNo=${userNumber}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();
            setFirstUrl(data.url);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          if (firstUrl) {

            navigation.navigate('CustomWebView', { uri: firstUrl });

          } else {
            try {
              const response = await fetch(`https://snappromise.com:8080/getCheckOutURL`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();
              const updatedUrl = `${data.url}?prefilled_email=${Email}`;
              setSecondUrl(updatedUrl);
              navigation.navigate('CustomWebView', { uri: updatedUrl });
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        }
      } else if (
        (response.message =
          'Either you do not have permission or credentials are invalid.')
      ) {
        ToastAndroid.show(
          'Either you do not have permission or credentials are invalid.',
          ToastAndroid.LONG,
        );
      } else {
        ToastAndroid.show('Please Try Again !', ToastAndroid.LONG);
      }
    }
  } catch (error) {
    console.error('Error in LoginPress:', error);
    setIsLoading(false); 
    ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.LONG);
  }
};

const onChangeEmail = async text => {
  setEmail(text);
};
const onChangePassword = async text => {
  setPassword(text);
};
return (
  <SafeAreaView style={styles.mainC}>
    {isLoading && <LoadingOverlay />}

    <LogoHeaderGlobel navigation={navigation} />
    <View style={{ width: wp(90), marginTop: hp(8), marginLeft: hp(2) }}>
      <Text style={Headings.InputH}>Log In</Text>
      <TextInput
        style={TextInP.Fileds}
        value={Email}
        onChangeText={text => onChangeEmail(text)}
        placeholder="Enter your email here"
        placeholderTextColor={'grey'}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={TextInP.Fileds}
          placeholder="Enter your password here"
          value={Password}
          onChangeText={text => onChangePassword(text)}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={'grey'}

        />
        <TouchableOpacity
          style={{ position: 'absolute', right: hp(2.1), top: hp(2.4), color: '#652D90' }}
          onPress={togglePasswordVisibility}>
          <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} style={{ color: '#652D90' }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPasswordEmailScreen')} style={{ alignItems: 'flex-end', }}>
        <Text style={{ fontWeight: 'bold', color: '#000' }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>

    <View style={{ marginTop: hp(3), alignItems: 'center' }}>
      <View>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={commonStyles.lognBtn}
        >
          <TouchableOpacity onPress={() => LoginPress()}>
            <Text style={TextInP.LogInButton}>Log In</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{ marginTop: hp(2) }}>
        <TouchableOpacity
          onPress={onGoogleButtonPress}
          style={commonStyles.SocialBtn}>
          <Image
            source={require('../source/google.png')} // Replace with the actual path to your local image
            style={{ width: 24, height: 24, marginRight: wp(2) }} // Adjust the width and height as needed
          />
          <Text style={{ color: 'black' }}>Continue with Google</Text>
        </TouchableOpacity>

      </View>
    </View>
  </SafeAreaView>
);
};

export default LoginScreen;

const styles = StyleSheet.create({
  m: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {API_URL} from '../../helper';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import ToggleSwitch from 'toggle-switch-react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Headings} from '../Styling/Headings';
import {TextInP} from '../Styling/TextInput';
import {useRecoilState} from 'recoil';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/Ionicons';
import {commonStyles} from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import {login, Sociallogin} from '../Network/LoginApi';
import {UserNo, token} from '../recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uemail} from '../recoil/Users/GetUsers';
import fetchUser from '../Network/Users/GetUser';
import LoadingOverlay from '../comp/Global/LoadingOverlay';
import base64 from 'react-native-base64';
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Token, setToken] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [email, setemail] = useRecoilState(uemail);
  const [isLoading, setIsLoading] = useState(false);
  const [firstUrl, setFirstUrl] = useState('');
  const [secondUrl, setSecondUrl] = useState('');
  const [isEmailPrivate, setIsEmailPrivate] = useState(true);
  const [isToggle, setIsToggle] = useState(true);

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

  function encodeToBase64(str) {
    return base64.encode(str);
  }

  async function onGoogleButtonPress() {
    setIsLoading(true);
    AsyncStorage.clear();

    try {
      // Ensure Play Services are available
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Sign out any existing Google sessions
      await GoogleSignin.signOut();

      // Sign in the user with Google
      const {idToken} = await GoogleSignin.signIn();

      // Use the idToken to get Google credentials
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = await auth().signInWithCredential(googleCredential);

      const user = user_sign_in.user;
      const userEmail = user.email.toLowerCase();
      let person = await fetchUser(userEmail);

      // Check if the user is attempting to sign in with Google while registered manually
      if (person.loginType === 'Manual') {
        Toast.show({
          type: 'error',
          text1: 'You are not signed in with Google or Apple',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }

      if (person.status === 'InActive') {
        Toast.show({
          type: 'error',
          text1: 'InActive Account',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }

      // Handle the case where the user does not exist
      if (person === 'User Does not Exist') {
        Toast.show({
          type: 'error',
          text1: 'User does not exist',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }

      // Proceed with the Google sign-in if all checks pass
      let response = await Sociallogin(
        userEmail,
        true,
      );

      // Handle the user's payment status
      const {paymentPending: paymentStatus, userNo: userNumber} = response;
      console.log("loginnnn", response);

      if (response.message === 'Success') {
        if (!paymentStatus) {
          // Successful sign-in and no payment pending
          await AsyncStorage.multiSet([
            ['token', response.token],
            ['userNo', userNumber],
            ['Email', userEmail],
            ['Name', user.displayName],
          ]);

          setToken(response.token);
          setUserN(userNumber);
          setEmail(userEmail);

          navigation.navigate('LoginScreen');
        } else {
          // Handle the scenario where the payment is pending
          await handlePaymentPortal(userNumber, userEmail);
        }
      }
    } catch (error) {
      console.log('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // A helper function to handle payment portal navigation
  async function handlePaymentPortal(userNumber, email) {
    try {
      const portalResponse = await fetch(
        `${API_URL}/getCustomerPortalURL?UserNo=${userNumber}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const portalData = await portalResponse.json();
      const {url: firstUrl} = portalData;

      if (firstUrl) {
        navigation.navigate('CustomWebView', {uri: firstUrl});
      } else {
        const checkoutResponse = await fetch(`${API_URL}/getCheckOutURL`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const checkoutData = await checkoutResponse.json();
        const updatedUrl = `${checkoutData.url}?prefilled_email=${email}`;
        navigation.navigate('CustomWebView', {uri: updatedUrl});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const LoginPress = async () => {
    AsyncStorage.clear();
    try {
      if (Email == '') {
        Toast.show({
          type: 'info',
          text1: 'Please Enter Email',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else if (Password == '') {
        Toast.show({
          type: 'info',
          text1: 'Please Enter Password',

          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        setIsLoading(true);
        const mail = Email.toLowerCase();
        let response = await login(mail, Password);
        const paymentStatus = response.paymentPending;
        const userNumber = response.userNo;
        await AsyncStorage.setItem('Subscription', response.subscription);
        setIsLoading(false);
        if (response.message === 'Success') {
          if (!paymentStatus) {
            setToken(response.token);
            setUserN(response.userNo);
            setemail(Email);
            let resp = await fetchUser(Email);
            if (resp.status == 'InActive') {
              Toast.show({
                type: 'error',
                text1: 'InActive Account',
                text1Style: {
                  fontSize: 14,
                  color: 'black',
                  flexWrap: 'wrap',
                  textAlign: 'center',
                },
                text2Style: {
                  fontSize: 14,
                  color: 'black',
                  flexWrap: 'wrap',
                  textAlign: 'center',
                },
                swipeable: true,
                text1NumberOfLines: 0,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            }
            await AsyncStorage.setItem('Email', mail);
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
              const response = await fetch(
                `${API_URL}/getCustomerPortalURL?UserNo=${userNumber}`,
                {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                },
              );

              const data = await response.json();
              setFirstUrl(data.url);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            if (firstUrl) {
              navigation.navigate('PremiumSubscription', {uri: firstUrl});
              // navigation.navigate('PremiumSubscription', {uri: firstUrl});

            } else {
              try {
                const response = await fetch(`${API_URL}/getCheckOutURL`, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });

                const data = await response.json();
                const updatedUrl = `${data.url}?prefilled_email=${Email}`;
                setSecondUrl(updatedUrl);
                navigation.navigate('PremiumSubscription', {uri: updatedUrl});
                // navigation.navigate('PremiumSubscription', {uri: updatedUrl});

              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }
        } else if (
          (response.message =
            'Either you do not have permission or credentials are invalid.')
        ) {
          Toast.show({
            type: 'error',
            text1: 'Either you do not have permission ',
            text2: 'or credentials are invalid.',
            text1Style: {
              fontSize: 14,
              color: 'black',
              flexWrap: 'wrap',
              textAlign: 'center',
            },
            text2Style: {
              fontSize: 14,
              color: 'black',
              flexWrap: 'wrap',
              textAlign: 'center',
            },
            swipeable: true,
            text1NumberOfLines: 0,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Please Try Again !',

            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      }
    } catch (error) {
      console.error('Error in LoginPress:', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Either you do not have permission ',
        text2: 'or credentials are invalid.',
        text1Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        text2Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        swipeable: true,
        text1NumberOfLines: 0,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  async function onAppleButtonPress() {
    setIsLoading(true);
    AsyncStorage.clear();
  
    try {
      // Perform the Apple sign-in request
      console.log('Attempting Sign in with Apple...');
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
  
      const {identityToken} = appleAuthRequestResponse;
  
      // Use the identityToken to fetch Apple credentials
      const data = await axios.get(`${API_URL}/getAppleCredentials?token=` + identityToken);
      const appleEmail = data.data.emailID.toLowerCase();
      const appleName = data.data.name;
  
      let person = await fetchUser(appleEmail);
  
      // Check if the user is attempting to sign in with Apple while registered manually
      if (person.loginType === 'Manual') {
        Toast.show({
          type: 'error',
          text1: 'You are not signed in with Google or Apple',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
  
      if (person.status === 'InActive') {
        Toast.show({
          type: 'error',
          text1: 'InActive Account',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
  
      // Handle the case where the user does not exist
      if (person === 'User Does not Exist') {
        Toast.show({
          type: 'error',
          text1: 'User does not exist',
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
  
      // Proceed with the Apple sign-in if all checks pass
      let response = await Sociallogin(
        appleEmail,
        true,
      );
  
      // Handle the user's payment status
      const {paymentPending: paymentStatus, userNo: userNumber} = response;
  
      if (response.message === 'Success') {
        if (!paymentStatus) {
          // Successful sign-in and no payment pending
          await AsyncStorage.multiSet([
            ['token', response.token],
            ['userNo', userNumber],
            ['Email', appleEmail],
            ['Name', appleName],
          ]);
  
          setToken(response.token);
          setUserN(userNumber);
          setEmail(appleEmail);
  
          navigation.navigate('LoginScreen');
        } else {
          // Handle the scenario where the payment is pending
          await handlePaymentPortal(userNumber, appleEmail);
        }
      }
    } catch (error) {
      console.log('Sign in with Apple error:', error);
      Alert.alert(
        'Apple Sign-In Error',
        error.message || 'Something went wrong with Apple Sign-In. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }
  

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
      <View style={{width: wp(90), marginTop: hp(8), marginLeft: hp(2)}}>
        <Text style={Headings.InputH}>Log In</Text>
        <TextInput
          style={TextInP.Fileds}
          value={Email}
          onChangeText={text => onChangeEmail(text)}
          placeholder="Enter your email here"
          placeholderTextColor={'grey'}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={TextInP.Fileds}
            placeholder="Enter your password here"
            value={Password}
            onChangeText={text => onChangePassword(text)}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={'grey'}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: hp(2.1),
              top: hp(2.6),
              color: '#652D90',
            }}
            onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              style={{color: '#652D90'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPasswordEmailScreen')}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: hp(3), alignItems: 'center'}}>
        <View>
          <TouchableOpacity onPress={() => LoginPress()}>
            <LinearGradient
              colors={['#E4A936', '#EE8347']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={commonStyles.lognBtn}>
              <Text style={TextInP.LogInButton}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={commonStyles.container}>
          <View style={commonStyles.line} />
          <Text style={commonStyles.text}> OR </Text>
          <View style={commonStyles.line} />
        </View>

        <View style={{}}>
          <TouchableOpacity
            onPress={onGoogleButtonPress}
            style={commonStyles.SocialBtn}>
            <Image
              source={require('../source/google.png')} // Replace with the actual path to your local image
              style={{width: 16, height: 16, marginRight: wp(2)}} // Adjust the width and height as needed
            />
            <Text style={{color: 'black', fontSize: hp(1.8)}}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={[commonStyles.SocialBtn, {marginTop: hp(1)}]}>
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{width: 200, height: 44}}
              onPress={onAppleButtonPress}
            />
          </TouchableOpacity>
        </View>

       
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
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

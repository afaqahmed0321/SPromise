import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Headings } from '../Styling/Headings';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { TextInP } from '../Styling/TextInput';
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import ForgetPasswordEmailScreen from './ForgetPasswordEmailScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { commonStyles } from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { login, Sociallogin } from '../Network/LoginApi';
import { UserNo, token } from '../recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uemail } from '../recoil/Users/GetUsers';
import fetchUser from '../Network/Users/GetUser';
import { signup, Socialsignup } from '../Network/SignUpApi';

const LoginScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Token, setToken] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [email, setemail] = useRecoilState(uemail);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  GoogleSignin.configure({
    webClientId:
      '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com',
    // iosClientId: '',
  });

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  async function onGoogleButtonPress() {
    console.log('here');
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(async user => {
        console.log(user.user.photoURL, 'aniqa Photo Url');
        let person = await fetchUser(user.user.email);
        console.log(person, 'aniqa Person');
        if (person == 'User Does not Exist') {
          let responses = await Socialsignup(
            user.user.email,
            user.user.displayName,
            true,
            user.user.photoURL,
          );
          console.log(responses, 'hey');
          if (responses == 'This user is already registered!') {
            let response = await Sociallogin(user.user.email, true);
            if (response.message === 'Success') {
              setToken(response.token);
              setUserN(response.userNo);
              setemail(user.user.email);
              let resp = await fetchUser(user.user.email);

              console.log(resp.firstName + ' ' + resp.lastName, 'response');
              await AsyncStorage.setItem('token', response.token);
              await AsyncStorage.setItem('userNo', response.userNo);
              await AsyncStorage.setItem('Email', user.user.email);
              await AsyncStorage.setItem('Name', user.user.displayName,

              );

              // navigation.navigate('HomeScreen')
            }
            // ToastAndroid.show('Registered Sucessfully!', ToastAndroid.LONG);
            // navigation.navigate('LoginScreen')
          } else {
            ToastAndroid.show(responses, ToastAndroid.LONG);
          }
        } else {
          let response = await Sociallogin(user.user.email, true);
          console.log(response, 'Login Response from Google');
          if (response.message === 'Success') {
            setToken(response.token);
            setUserN(response.userNo);
            setemail(user.user.email);
            let resp = await fetchUser(user.user.email);

            console.log(resp.firstName + ' ' + resp.lastName, 'response');
            await AsyncStorage.setItem('token', response.token);
            await AsyncStorage.setItem('userNo', response.userNo);
            await AsyncStorage.setItem('Email', user.user.email);
            await AsyncStorage.setItem(
              'Name',
              user.user.displayName
            );

            navigation.navigate('HomeScreen');
          }
        }
        // navigation.navigate('HomeScreen')
        // setLoginState(true)
      })
      .catch(error => {
        console.log(error);
      });
  }
  const LoginPress = async () => {
    if (Email == '') {
      ToastAndroid.show('Please Enter Email', ToastAndroid.LONG);
    } else if (Password == '') {
      ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
    } else {
      let response = await login(Email, Password);
      if (response.message === 'Success') {
        setToken(response.token);
        setUserN(response.userNo);
        setemail(Email);
        let resp = await fetchUser(Email);
        console.log(resp.firstName + ' ' + resp.lastName, 'response');
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
        // navigation.navigate('HomeScreen')
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
      console.log(response, 'inLogin');
    }
  };
  const onChangeEmail = async text => {
    // Update the Email state with the new text input
    setEmail(text);
  };
  const onChangePassword = async text => {
    setPassword(text);
  };
  const handleForgetPassword = () => {
    navigation.navigate('ForgetPasswordEmailScreen'); 
  };
  return (
    <SafeAreaView style={styles.mainC}>
      <LogoHeaderGlobel navigation={navigation} />
      <View style={{ width: wp(90), marginTop: hp(8), marginLeft: hp(2) }}>
        <Text style={Headings.InputH}>Log In</Text>
        {/* <Text style={Headings.Input3}>Email</Text> */}
        <TextInput
          style={TextInP.Fileds}
          value={Email}
          onChangeText={text => onChangeEmail(text)}
          placeholder="Enter your email here"
          placeholderTextColor={'grey'}
        />
        {/* <Text style={Headings.Input3}>Password</Text> */}
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
        <TouchableOpacity onPress={handleForgetPassword} style={{ alignItems: 'flex-end', }}>
          <Text style={{ fontWeight: 'bold', color: '#000' }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {/* <View></View> */}
      <View style={{ marginTop: hp(3), alignItems: 'center' }}>
        <View>
          <LinearGradient
            colors={['#E4A936', '#EE8347']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={commonStyles.lognBtn}
          >
            <TouchableOpacity
              onPress={() => LoginPress()}
              >
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
          {/* <TouchableOpacity 
            // onPress={() => navigation.navigate('LoginScreen')}
            onPress={onFacebookButtonPress}
            style={commonStyles.SocialBtn}>
            <Icon
              name='logo-facebook' // Use appropriate icon names
              size={24}
            color="blue"
            />
            <Text style={{color: 'black', marginLeft:wp(2)}}>Continue with Facebook</Text>
          </TouchableOpacity> */}
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

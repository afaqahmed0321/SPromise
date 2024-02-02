import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Headings} from '../Styling/Headings';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {TextInP} from '../Styling/TextInput';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import Icon from 'react-native-vector-icons/Ionicons';
import {commonStyles} from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';

import {loginState} from '../recoil/auth/loginState';
import {useRecoilState} from 'recoil';

const LoginScreen = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [lgnstate, setLoginState] = useRecoilState(loginState);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.signOut();

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(user => {
        console.log(user);
        // navigation.navigate('HomeScreen')
        setLoginState(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View style={styles.mainC}>
      <LogoHeaderGlobel />
      <View style={{width: wp(90), marginTop: hp(1), marginLeft: hp(2)}}>
        <Text style={Headings.InputH}>Log In</Text>
        <Text style={Headings.Input3}>Email</Text>
        <TextInput style={TextInP.Fileds} placeholder="    Email" />
        <Text style={Headings.Input3}>Password</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={TextInP.Fileds}
            placeholder="    *******"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: hp(2.1), top: hp(2.7)}}
            onPress={togglePasswordVisibility}>
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', right: hp(0), top: hp(30)}}>
          <Text style={{fontWeight: 'bold'}}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: hp(9), alignItems: 'center'}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            style={commonStyles.lognBtn}>
            <Text style={{color: 'white'}}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: hp(6)}}>
          {/* <TouchableOpacity
            onPress={onGoogleButtonPress}
            style={commonStyles.SocialBtn}>
            <Image
              source={require('./source/google.png')} // Replace with the actual path to your local image
              style={{width: 24, height: 24, marginRight: wp(2)}} // Adjust the width and height as needed
            />
            <Text style={{color: 'black'}}>Continue with Google</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            // onPress={() => navigation.navigate('LoginScreen')}
            onPress={onFacebookButtonPress}
            style={commonStyles.SocialBtn}>
            <Icon
              name="logo-facebook" // Use appropriate icon names
              size={24}
              color="blue"
            />
            <Text style={{color: 'black', marginLeft: wp(2)}}>
              Continue with Facebook
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
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

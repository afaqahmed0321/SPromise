import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Headings } from '../Styling/Headings';
import { TextInP } from '../Styling/TextInput';

import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { commonStyles } from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { signup, Socialsignup } from '../Network/SignUpApi';
import VerifyOTP from '../Network/Verification';
import { useRecoilState } from 'recoil';
import { code, uemail, ufName, ulName, upassword } from '../recoil/Users/GetUsers';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import fetchUser from '../Network/Users/GetUser';
import { Sociallogin } from '../Network/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { token, UserNo } from '../recoil/AddPromise';
import LinearGradient from 'react-native-linear-gradient';


GoogleSignin.configure({
  webClientId: '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com',
});

const SignUpScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleCPasswordVisibility = () => {
    setIsCPasswordVisible(!isCPasswordVisible);
  };

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [emailID, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');
  const [Code, setCode] = useRecoilState(code);
  const [Semail, setSemail] = useRecoilState(uemail);
  const [Spassword, setSpassword] = useRecoilState(upassword);
  const [Sfname, setSfname] = useRecoilState(ufName);
  const [slname, setslname] = useRecoilState(ulName);
  const [Token, setToken] = useRecoilState(token)
  const [userN, setUserN] = useRecoilState(UserNo)
  const [email, setemail] = useRecoilState(uemail)
  const handleSignup = async () => {
    const isValidEmail = (email) => {
      // Email validation using regular expression
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    };
    if (fName == '') {
      ToastAndroid.show('Please Enter First Name', ToastAndroid.LONG);
    }
    else if (lName == '') {
      ToastAndroid.show('Please Enter Last Name', ToastAndroid.LONG);

    }
    else if (emailID === '') {
      ToastAndroid.show('Please Enter Email', ToastAndroid.LONG);
    } else if (!isValidEmail(emailID)) {
      ToastAndroid.show('Please Enter a Valid Email Address', ToastAndroid.LONG);
    }
    else if (password == '') {
      ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);

    }
    else if (password != Confirmpassword) {
      ToastAndroid.show('Password is not Confirmed', ToastAndroid.LONG);
    }
    else {
      let response = await VerifyOTP(emailID);

      console.log(response.code, "aniqa")
      if (response.description = "Operation completed successfully.") {
        setCode(response.code)
        setSemail(emailID)
        setSpassword(password)
        setSfname(fName)
        setslname(lName)
        navigation.navigate('VerficationPage')
      }
      else {
        ToastAndroid.show('Something went wrong !', ToastAndroid.LONG);

      }

      // let response = await signup(emailID, password, fName, lName);
      // if(response="Registered")
      // {
      //   ToastAndroid.show('Registered Sucessfully!', ToastAndroid.LONG);
      //   setFName('')
      //   setLName('')
      //   setEmail('')
      //   setPassword('')
      //   setConfirmPassword('')
      // }
      // else{
      //   ToastAndroid.show('Not Registered!', ToastAndroid.LONG);

      // }
      // console.log('Clicked');
    }

  };


  // Google Auth 


  async function onGoogleButtonPress() {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then(async (user) => {
      console.log(user.user.photoURL, "aniqa");
      let person = await fetchUser(user.user.email)
      console.log(person, "aniqa")
      if (person == 'User Does not Exist') {
        let responses = await Socialsignup(user.user.email, user.user.displayName, true, user.user.photoURL);
        console.log(responses, "hey")
        if (responses == "Registered") {
          let response = await Sociallogin(user.user.email, true,)
          if (response.message === 'Success') {
            setToken(response.token)
            setUserN(response.userNo)
            setemail(user.user.email)
            let resp = await fetchUser(user.user.email)

            console.log(resp.firstName + " " + resp.lastName, "response")
            await AsyncStorage.setItem("token", response.token)
            await AsyncStorage.setItem("userNo", response.userNo)
            await AsyncStorage.setItem("Email", user.user.email)
            await AsyncStorage.setItem("Name", resp.firstName + " " + resp.lastName)

            // navigation.navigate('HomeScreen')

          }
          // ToastAndroid.show('Registered Sucessfully!', ToastAndroid.LONG);
          // navigation.navigate('LoginScreen')

        }
        else {
          ToastAndroid.show(responses, ToastAndroid.LONG);

        }
      }
      else {
        let response = await Sociallogin(user.user.email, true)
        if (response.message === 'Success') {
          setToken(response.token)
          setUserN(response.userNo)
          setemail(user.user.email)
          let resp = await fetchUser(user.user.email)

          console.log(resp.firstName + " " + resp.lastName, "response")
          await AsyncStorage.setItem("token", response.token)
          await AsyncStorage.setItem("userNo", response.userNo)
          await AsyncStorage.setItem("Email", user.user.email)
          await AsyncStorage.setItem("Name", resp.firstName + " " + resp.lastName)

          navigation.navigate('HomeScreen')

        }
      }
      // navigation.navigate('HomeScreen')
      // setLoginState(true)
    })
      .catch((error) => {
        console.log(error)
      })
  }




  // /




  return (
    <View style={styles.mainC}>
      <ScrollView>
        <LogoHeaderGlobel navigation={navigation} />
        <View style={{ width: wp(90), marginLeft: hp(2) }}>
          <Text style={Headings.InputH}>Sign Up</Text>
          <View
            style={{
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={Headings.Input3}>Fist Name</Text>
              <TextInput
                style={TextInP.Fileds}
                placeholder="First Name"
                value={fName}
                onChangeText={setFName}
                placeholderTextColor={'black'}
              />
            </View>

            <View>
              <Text style={Headings.Input3}>Last Name</Text>
              <TextInput
                style={TextInP.Fileds}
                placeholder="Last Name"
                value={lName}
                onChangeText={setLName}
                placeholderTextColor={'black'}

              />
            </View>
          </View>
          <Text style={Headings.Input3}>Email</Text>
          <TextInput
            style={TextInP.Fileds}
            placeholder="Email"
            value={emailID}
            onChangeText={setEmail}
            placeholderTextColor={'black'}

          />
          <Text style={Headings.Input3}>Create Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={TextInP.Fileds}
              placeholder="*******"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={'black'}

            />
            <TouchableOpacity
              style={{ position: 'absolute', right: hp(2.1), top: hp(2.4) }}
              onPress={togglePasswordVisibility}>
              <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} style={{ color: '#652D90' }} />
            </TouchableOpacity>
          </View>
          <Text style={Headings.Input3}>Confirm Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={TextInP.Fileds}
              placeholder="*******"
              onChangeText={setConfirmPassword}
              value={Confirmpassword}
              secureTextEntry={!isCPasswordVisible}
              placeholderTextColor={'black'}

            />
            <TouchableOpacity
              style={{ position: 'absolute', right: hp(2.1), top: hp(2.4) }}
              onPress={toggleCPasswordVisibility}>
              <Icon name={isCPasswordVisible ? 'eye-off' : 'eye'} size={24} style={{ color: '#652D90' }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: hp(2), alignItems: 'center' }}>
          <View>
            <LinearGradient
              colors={['#73B6BF', '#2E888C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={commonStyles.SignUpBtn}
            >
              <TouchableOpacity
                // onPress={() => navigation.navigate('VerficationPage')}
                onPress={() => handleSignup()}
              >
                <Text style={{
                  color: 'white', fontSize: 16,
                  color: 'white', fontWeight: 'bold'
                }}>Create Account</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ marginTop: hp(3), paddingBottom: 20 }}>
            {/* <View>
              <Text style={{ textAlign: 'center', color: 'black' }}>
                ----------Or Register With----------
              </Text>
            </View> */}
            {/* <View style={commonStyles.container1}>
              <View style={commonStyles.divider}>
                <Text style={commonStyles.text}>Or Register With</Text>
              </View>
            </View> */}
            <View style={commonStyles.container}>
              <View style={commonStyles.line} />
              <Text style={commonStyles.text}>Or Register With</Text>
              <View style={commonStyles.line} />
            </View>
            {/* <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={commonStyles.SocialBtn}>
            <Icon name="logo-google" size={24} color="red" />
            <Text style={{color: 'black', marginLeft: wp(2)}}>
              Continue with Google
            </Text>
          </TouchableOpacity> */}


            {/* //Google Auth by AB */}
            <TouchableOpacity onPress={onGoogleButtonPress} style={commonStyles.SocialBtn}>
              <Image
                source={require('../source/google.png')} // Replace with the actual path to your local image
                style={{ width: 24, height: 24, marginRight: wp(2) }} // Adjust the width and height as needed
              />
              <Text style={{ color: 'black' }}>Continue with Google</Text>
            </TouchableOpacity>


            {/* /// */}
            {/* <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={commonStyles.SocialBtn}>
            <Icon name="logo-facebook" size={24} color="blue" />
            <Text style={{color: 'black', marginLeft: wp(2)}}>
              Continue with Facebook
            </Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  m: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  // LogoC: {
  //   width: hp(14),
  //   height: hp(14),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // ImageStyle: {
  //   width: hp(14),
  //   height: hp(14),
  //   borderRadius: hp(25) / 2,
  //   resizeMode: 'cover',
  // },
  // line: {
  //   height: hp(1), // Adjust the height to your preference
  //   backgroundColor: 'black',
  // },
});

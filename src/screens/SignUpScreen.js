import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  ActivityIndicator
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
import { code, uemail, ufName, ulName, upassword, uSubscription } from '../recoil/Users/GetUsers';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import fetchUser from '../Network/Users/GetUser';
import { Sociallogin } from '../Network/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { token, UserNo } from '../recoil/AddPromise';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import LoadingOverlay from '../comp/Global/LoadingOverlay';


GoogleSignin.configure({
  webClientId: '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com',
});

const SignUpScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Free', value: 'Free' },
    { label: 'Paid', value: 'Paid' },
  ]);

  const handleDropdownSelect = (item) => {
    setValue(item.value);
    setOpen(false);
  };


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
  const [subscription, setSubscription] = useState('');
  const [Code, setCode] = useRecoilState(code);
  const [Semail, setSemail] = useRecoilState(uemail);
  const [Spassword, setSpassword] = useRecoilState(upassword);
  const [Sfname, setSfname] = useRecoilState(ufName);
  const [slname, setslname] = useRecoilState(ulName);
  const [sSubscription, setSSubscription] = useRecoilState(uSubscription)
  const [Token, setToken] = useRecoilState(token)
  const [userN, setUserN] = useRecoilState(UserNo)
  const [email, setemail] = useRecoilState(uemail)


  const handleSignup = async () => {
    try {
      const isValidEmail = (email) => {
        // Email validation using regular expression
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
      };

      const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };

      if (fName === '') {
        ToastAndroid.show('Please Enter First Name', ToastAndroid.LONG);
        return;
      } else if (lName === '') {
        ToastAndroid.show('Please Enter Last Name', ToastAndroid.LONG);
        return;
      } else if (emailID === '') {
        ToastAndroid.show('Please Enter Email', ToastAndroid.LONG);
        return;
      } else if (!isValidEmail(emailID)) {
        ToastAndroid.show('Please Enter a Valid Email Address', ToastAndroid.LONG);
        return;
      } else if (password === '') {
        ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
        return;
      } else if (!isValidPassword(password)) {
        ToastAndroid.show('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters', ToastAndroid.LONG);
        return;
      } else if (password !== Confirmpassword) {
        ToastAndroid.show('Password is not Confirmed', ToastAndroid.LONG);
        return;
      }

      // Set isLoading to true when starting the signup process
      setIsLoading(true);

      // If all validations pass, proceed with the signup process
      let response = await VerifyOTP(emailID);

      console.log(response.code, "aniqa")
      if (response.description === "Operation completed successfully.") {
        setCode(response.code)
        setSemail(emailID)
        setSpassword(password)
        setSfname(fName)
        setslname(lName)
        setSSubscription(subscription)
        console.log("near navigate")
        // Navigate to the verification page
        navigation.navigate('VerficationPage');
      } else {
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Signup Error:', error);
      // Handle signup errors here...
    } finally {
      // Set isLoading to false when the signup process completes, regardless of success or failure
      setIsLoading(false);
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
    })
      .catch((error) => {
        console.log(error)
      })
  }




  // /




  return (
    <View style={styles.mainC}>
      {isLoading && <LoadingOverlay />}

      <ScrollView>
        <LogoHeaderGlobel navigation={navigation} />

        <View style={{ width: wp(90), marginLeft: hp(2) }}>
          <Text style={Headings.InputH}>Sign Up</Text>
          <View>
            <View>
              {/* <Text style={Headings.Input3}>Fist Name</Text> */}
              <TextInput
                style={TextInP.Fileds}
                placeholder="First Name"
                value={fName}
                onChangeText={setFName}
                placeholderTextColor={'black'}
              />
            </View>

            <View>
              {/* <Text style={Headings.Input3}>Last Name</Text> */}
              <TextInput
                style={TextInP.Fileds}
                placeholder="Last Name"
                value={lName}
                onChangeText={setLName}
                placeholderTextColor={'black'}

              />
            </View>
          </View>
          {/* <Text style={Headings.Input3}>Email</Text> */}
          <TextInput
            style={TextInP.Fileds}
            placeholder="Email"
            value={emailID}
            onChangeText={setEmail}
            placeholderTextColor={'black'}
          />
          {/* <Text style={Headings.Input3}>Create Password</Text> */}
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
          {/* <Text style={Headings.Input3}>Confirm Password</Text> */}
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

          <View>
            {/* <Text style={Headings.Input3}>Subscription</Text> */}

            <DropDownPicker
              open={open}
              value={subscription}
              items={items}
              setOpen={setOpen}
              setValue={setSubscription}
              setItems={setItems}
              style={[TextInP.Fileds, { borderRadius: open ? wp(6) : wp(50) }]}
              placeholder="Subscription"
              placeholderStyle={{ color: '#000' }}
              dropDownContainerStyle={{ backgroundColor: '#F6E2FF', borderRadius: open ? wp(6) : wp(50), height: hp(12), borderColor: 'transparent', paddingLeft: 8, }}
            />
            {open && (
              <View>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleDropdownSelect(item)}
                  >
                    <Text>
                      {item.label}
                      {item.value === value && <Icon name="checkmark" size={20} />}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}


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
                <Text style={TextInP.SignInButton}>Create Account</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ marginTop: hp(3), paddingBottom: 20 }}>

            <View style={commonStyles.container}>
              <View style={commonStyles.line} />
              <Text style={commonStyles.text}>Or Register With</Text>
              <View style={commonStyles.line} />
            </View>



            {/* //Google Auth by AB */}
            <TouchableOpacity onPress={onGoogleButtonPress} style={commonStyles.SocialBtn}>
              <Image
                source={require('../source/google.png')} // Replace with the actual path to your local image
                style={{ width: 24, height: 24, marginRight: wp(2) }} // Adjust the width and height as needed
              />
              <Text style={{ color: 'black' }}>Continue with Google</Text>
            </TouchableOpacity>



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

});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Headings } from '../Styling/Headings';
import { TextInP } from '../Styling/TextInput';

import Icon from 'react-native-vector-icons/Ionicons';
import { commonStyles } from '../Styling/buttons';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { signup, Socialsignup } from '../Network/SignUpApi';
import VerifyOTP from '../Network/Verification';
import { useRecoilState } from 'recoil';
import { code, uemail, ufName, ulName, upassword, uSubscription } from '../recoil/Users/GetUsers';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import fetchUser from '../Network/Users/GetUser';
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
    { label: 'Free', value: 'Free',textStyle: { color: 'black' } },
    { label: 'Paid', value: 'Paid',textStyle: { color: 'black' } },
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

  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = async () => {
    try {
      const isValidEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email.toLowerCase());
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
      } else if (passwordError !== '') {
        ToastAndroid.show('Please enter a valid password', ToastAndroid.LONG);
        return;
      } else if (password !== Confirmpassword) {
        ToastAndroid.show('Password do not match', ToastAndroid.LONG);
        return;
      }

      setIsLoading(true);
      const mail = emailID.toLowerCase();
      let response = await VerifyOTP(mail);

      console.log(response.code, "aniqa")
      if (response.description === "Operation completed successfully.") {
        setCode(response.code)
        setSemail(emailID)
        setSpassword(password)
        setSfname(fName)
        setslname(lName)
        setSSubscription(subscription)
        console.log("near navigate")
        navigation.navigate('VerficationPage');
      } else {
        ToastAndroid.show('User Already Exists!', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Signup Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  async function onGoogleButtonPress() {
    setIsLoading(true);
  
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await GoogleSignin.signOut();
  
      const { idToken } = await GoogleSignin.signIn();
      setSSubscription(subscription);
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = await auth().signInWithCredential(googleCredential);
  
      console.log(user_sign_in.user.photoURL, "aniqa");
  
      let person = await fetchUser(user_sign_in.user.email);
      console.log(person, "aniqa user email");
  
      if (person === 'User Does not Exist') {
        const mail = user_sign_in.user.email.toLowerCase();
        let responses = await Socialsignup(mail, user_sign_in.user.displayName, true, user_sign_in.user.photoURL, sSubscription);
        console.log(responses, "hey response from social signup API");
  
        if (responses === "Registered") {
          ToastAndroid.show('Registered Successfully!', ToastAndroid.LONG);
          navigation.navigate('LoginScreen');
        } else {
          ToastAndroid.show(responses, ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show('User is already registered...!', ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFNameChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z]/g, '');
    setFName(formattedText);
  };

  const handleLNameChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z]/g, '');
    setLName(formattedText);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePassword(text);
  };

  return (
    <View style={styles.mainC}>
      {isLoading && <LoadingOverlay />}

      <ScrollView>
        <LogoHeaderGlobel navigation={navigation} />

        <View style={{ width: wp(90), marginLeft: hp(2) }}>
          <Text style={Headings.InputH}>Sign Up</Text>
          <View>
            <View>
              <TextInput
                style={TextInP.Fileds}
                placeholder="First Name"
                value={fName}
                onChangeText={handleFNameChange}
                placeholderTextColor={'grey'}
              />
            </View>

            <View>
              <TextInput
                style={TextInP.Fileds}
                placeholder="Last Name"
                value={lName}
                onChangeText={handleLNameChange}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          <TextInput
            style={TextInP.Fileds}
            placeholder="Email"
            value={emailID}
            onChangeText={setEmail}
            placeholderTextColor={'grey'}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={TextInP.Fileds}
              placeholder="*******"
              onChangeText={handlePasswordChange}
              value={password}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: hp(2.1), top: hp(2.4) }}
              onPress={togglePasswordVisibility}>
              <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} style={{ color: '#652D90' }} />
            </TouchableOpacity>
          </View>
          {passwordError !== '' && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={TextInP.Fileds}
              placeholder="*******"
              onChangeText={setConfirmPassword}
              value={Confirmpassword}
              secureTextEntry={!isCPasswordVisible}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: hp(2.1), top: hp(2.4) }}
              onPress={toggleCPasswordVisibility}>
              <Icon name={isCPasswordVisible ? 'eye-off' : 'eye'} size={24} style={{ color: '#652D90' }} />
            </TouchableOpacity>
          </View>
          <View>
            <DropDownPicker
              open={open}
              value={subscription}
              items={items}
              setOpen={setOpen}
              setValue={setSubscription}
              setItems={setItems}
              style={[TextInP.Fileds, { borderRadius: open ? wp(6) : wp(50) }]}
              placeholder="Subscription"
              placeholderTextColor={'grey'}
              dropDownContainerStyle={{ backgroundColor: '#F6E2FF', borderRadius: open ? wp(6) : wp(50), height: hp(12), borderColor: 'transparent', paddingLeft: 8, }}
              textStyle={{ color: 'grey' }}
            />
            {open && (
              <View>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleDropdownSelect(item)}
                  >
                    <Text >
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
                onPress={() => handleSignup()}
              >
                <Text style={TextInP.SignInButton1}>Create Account</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
          <View style={{paddingBottom:8}}>

            <View style={commonStyles.container}>
              <View style={commonStyles.line} />
              <Text style={commonStyles.text}>OR</Text>
              <View style={commonStyles.line} />
            </View>
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
  mainC: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  },
});

import { StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel'
import { Headings } from '../Styling/Headings'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { commonStyles } from '../Styling/buttons'
import { code, uemail, ufName, ulName, upassword } from '../recoil/Users/GetUsers';
import { useRecoilState } from 'recoil';
import OtpInputs from 'react-native-otp-inputs';
import { signup } from '../Network/SignUpApi';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

const EnterOTPScreen = ({ navigation }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [Code, setCode] = useRecoilState(code);
  // const [Semail, setSemail] = useRecoilState(uemail);
  // const [Spassword, setSpassword] = useRecoilState(upassword);
  // const [Sfname, setSfname] = useRecoilState(ufName);
  // const [slname, setslname] = useRecoilState(ulName);
  const [fName, setFName] = useRecoilState(ufName);
  const [lName, setLName] = useRecoilState(ulName);
  const [emailID, setEmail] = useRecoilState(uemail);
  const [password, setPassword] = useRecoilState(upassword);
  const [OutputCode, setOutputCode] = useState('');

  const route = useRoute();
  const receivedData = route.params?.code || {};

  // const resendCode = () => {
  //   if (!isCodeSent) {

  //     setIsCodeSent(true);


  //     setResendCooldown(30);


  //     console.log('Code Sent', 'A verification code has been sent.');
  //   } else {

  //   }

  // };

  useEffect(() => {
    // Decrease the resend cooldown timer every second
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  const verification = async () => {
    console.log("here", OutputCode, Code)
    console.log(fName, lName, password, emailID, "here1")

    if (OutputCode == Code) {
      console.log(fName, lName, password, emailID, "here11111111111")
      navigation.navigate('EnterNewPasswordScreen');


    }
    else {
      console.log("here2")

      ToastAndroid.show('OTP is incorrect, Please try again', ToastAndroid.LONG);

    }
  }
  const verifyOTP = () => {
    // Add logic to verify the entered OTP
    navigation.navigate('EnterNewPasswordScreen');

  };
  return (
    <View style={{ flex: 1 }}>
      <LogoHeaderGlobel navigation={navigation} />

      <View style={{
        width: wp(90), marginTop: hp(1), marginLeft: hp(2),
        //  borderWidth:wp(1)
      }}>
        <Text style={Headings.h1} >
          Please check your email
        </Text>
        <Text style={[Headings.Input31]}>
          We've sent a code to user {emailID}
        </Text>
        <View style={{ alignItems: 'center', justifyContent: "space-around", marginTop: hp(2.5), flexDirection: 'row', }}>
          <OtpInputs
            autofillFromClipboard={false}
            inputContainerStyles={styles.inBox}
            handleChange={(code) => setOutputCode(code)}
            numberOfInputs={4}
            inputStyles={{ textAlign: 'center', fontSize: hp(3), color: '#000' }}
          />
        </View>
        <View style={{ marginTop: hp(3) }}>
          <LinearGradient
            colors={['#73B6BF', '#2E888C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={commonStyles.SignUpBtn}
          >
            <TouchableOpacity
              onPress={verification}
            >
              <Text style={{ color: 'white' }}>Verify</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>


          <TouchableOpacity onPress={() => setResendCooldown(30)}>
            <Text style={{ color: 'black', textAlign: 'center', marginTop: hp(2), fontWeight: '600', fontSize: 16 }}>Send code again   00:{resendCooldown}  </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default EnterOTPScreen

const styles = StyleSheet.create({
  inBox: {

    width: wp(20),
    borderRadius: wp(4),
    backgroundColor: 'white',
    height: hp(8),
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: hp(3),
    borderColor: "#652D90",
    borderWidth: 1,
    padding: 0,
    margin: 0,

  }
})
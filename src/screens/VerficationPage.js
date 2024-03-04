import { StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel'
import { Headings } from '../Styling/Headings'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { commonStyles } from '../Styling/buttons'
import { code, uSubscription, uemail, ufName, ulName, upassword } from '../recoil/Users/GetUsers';
import { useRecoilState } from 'recoil';
import OtpInputs from 'react-native-otp-inputs';
import { signup } from '../Network/SignUpApi';
import LinearGradient from 'react-native-linear-gradient';
import VerifyOTP from '../Network/Verification';

const VerficationPage = ({ navigation }) => {
  const [resendCooldown, setResendCooldown] = useState(0);
  const [Code, setCode] = useRecoilState(code);
  const [fName, setFName] = useRecoilState(ufName);
  const [lName, setLName] = useRecoilState(ulName);
  const [emailID, setEmail] = useRecoilState(uemail);
  const [password, setPassword] = useRecoilState(upassword);
  const [OutputCode, setOutputCode] = useState('');
  const [subscription, setSubscription] = useRecoilState(uSubscription);


  const resendCode = async () => {
    setResendCooldown(60)
    const mail = emailID.toLowerCase();
    let response = await VerifyOTP(mail)

    try {
      console.log("Forget password is hitted", response);
      setCode(response.code);
    }
    catch {
      console.log("Error in forgot password", error);
    };
  };
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1500);
      return () => clearTimeout(timer);
    }
    setTimeout(() => {
      setCode(null);
    }, 60000);
  }, [resendCooldown, resendCode]);

  const verification = async () => {
    console.log("here", OutputCode, Code)
    console.log(fName, lName, password, emailID, subscription, "here1")

    if (OutputCode == Code) {
      console.log(fName, lName, password, emailID, subscription, "here1")
      const mail = emailID.toLowerCase();
      let response = await signup(mail, password, fName, lName, subscription);
      console.log(response, "hey")
      if (response == "Registered") {
        ToastAndroid.show('Registered Sucessfully!', ToastAndroid.LONG);
        navigation.navigate('LoginScreen')

      }
      else {
        ToastAndroid.show(response, ToastAndroid.LONG);
      }
    }
    else {
      console.log("here2")
      ToastAndroid.show('OTP is incorrect, Please try again', ToastAndroid.LONG);

    }
  }
  return (
    <View style={{ backgroundColor: '#e4eee6', flex: 1 }}>
      <LogoHeaderGlobel />
      <View style={{
        width: wp(90), marginTop: hp(1), marginLeft: hp(2),
      }}>
        <Text style={Headings.h1} >
          Please check your email
        </Text>
        <Text style={[Headings.Input31]}>
          We've sent a code to user {emailID.toLowerCase()}
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
            style={commonStyles.lognBtn}
          >
            <TouchableOpacity
              onPress={() => verification()}
            >
              <Text style={{ color: 'white' }}>Verify</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>
          {resendCooldown <= 0 ? (
            <TouchableOpacity onPress={resendCode}>
              <Text style={{ color: 'black', textAlign: 'center', marginTop: hp(2), fontWeight: '600', fontSize: 16 }}>Send code again</Text>
            </TouchableOpacity>
          ) : (
            null
          )}

        </View>
      </View>
    </View>
  )
}

export default VerficationPage

const styles = StyleSheet.create({
  inBox: {

    width: wp(20),
    borderRadius: wp(4),
    backgroundColor: 'white',
    height: hp(8),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(3),
    borderColor: "#652D90",
    borderWidth: 1,
  }
})
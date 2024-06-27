import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
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
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import PasswordVerification from '../Network/PasswordVerification';

const EnterOTPScreen = ({ navigation }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [Code, setCode] = useRecoilState(code);
  const [fName, setFName] = useRecoilState(ufName);
  const [lName, setLName] = useRecoilState(ulName);
  const [emailID, setEmail] = useRecoilState(uemail);
  const [password, setPassword] = useRecoilState(upassword);
  const [OutputCode, setOutputCode] = useState('');

  const route = useRoute();
  const receivedData = route.params?.code || {};
  const mail = emailID.toLowerCase();

  const resendCode = async () => {
    setResendCooldown(60)

    let response = await PasswordVerification(mail)

      try {
        setCode(response.code);
      }
      catch {
        console.log("Error in forgot password");
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
    if (OutputCode == Code) {
      navigation.navigate('EnterNewPasswordScreen');
    }
    else {
      ToastAndroid.show('OTP is incorrect, Please try again', ToastAndroid.LONG);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <LogoHeaderGlobel navigation={navigation} />

      <View style={{
        width: wp(90), marginTop: hp(1), marginLeft: hp(2),
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
            style={commonStyles.ForgetVerify}
          >
            <TouchableOpacity
              onPress={verification}
            >
              <Text style={{ color: 'white', fontSize: hp(1.8), fontWeight: "800", width: wp(90), textAlign: "center" }}>Verify</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>

          {resendCooldown <= 0 ? (
            <TouchableOpacity onPress={resendCode}>
              <Text style={{ color: 'black', textAlign: 'center', marginTop: hp(2), fontWeight: '600', fontSize: hp(1.8) }}>Send code again</Text>
            </TouchableOpacity>
          ) : (
            null 
          )}

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
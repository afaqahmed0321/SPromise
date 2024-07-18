import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
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
import Toast from 'react-native-toast-message';

const VerficationPage = ({ navigation }) => {
  const [resendCooldown, setResendCooldown] = useState(30);
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
    console.log("respppp", response);
    try {
      setCode(response.code);
    }
    catch {
      console.log("Error in forgot password", error);
    };
  };
  useEffect(() => {

    console.log("codeeee", Code);

    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setTimeout(() => {
      setCode(null);
    }, 600000);
  }, [resendCooldown, resendCode]);

  const verification = async () => {

    console.log("codessss", OutputCode, Code);

    if (OutputCode == Code) {
      const mail = emailID.toLowerCase();
      let response = await signup(mail, password, fName, lName, subscription);
      if (response === "Registered") {
        Toast.show({
          type: 'success',
          text1: 'Registered Successfully!',
          visibilityTime: 3000, // 3 sec
          position: 'bottom',
        });
        navigation.navigate('LoginScreen');
      } else {
        Toast.show({
          type: 'info',
          text1: `${response}`,
          visibilityTime: 3000, // 3 sec
          position: 'bottom',
        });
      }
    } else {
      Toast.show({
        type: 'info',
        text1: 'OTP is incorrect. Please try again.',
        visibilityTime: 3000, // 3 sec
        position: 'bottom',
      });
    }
  };
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
          <TouchableOpacity
            onPress={() => verification()}
          >
            <LinearGradient
              colors={['#73B6BF', '#2E888C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={commonStyles.lognBtn}
            >
              <Text style={{ color: 'white' }}>Verify</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          {resendCooldown <= 0 && (
            <TouchableOpacity onPress={resendCode}>
              <Text style={{ color: 'black', textAlign: 'center', marginTop: hp(2), fontWeight: '600', fontSize: hp(1.6) }}>Send code again</Text>
            </TouchableOpacity>
           ) } 

        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />

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
    paddingVertical:wp(5)
  }
})
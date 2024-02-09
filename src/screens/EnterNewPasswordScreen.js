import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';

const EnterNewPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignup = async () => {
    if (password == '') {
      ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
    }
    else if (password != confirmPassword) {
      ToastAndroid.show('Password is not Confirmed', ToastAndroid.LONG);
    }
    // else {
    //   let response = await VerifyOTP(emailID);

    //   console.log(response.code, "aniqa")
    //   if (response.description = "Operation completed successfully.") {
    //     setCode(response.code)
    //     setPassword(password)
    //     navigation.navigate('VerficationPage')
    //   }
    //   else {
    //     ToastAndroid.show('Something went wrong !', ToastAndroid.LONG);

    //   }
    // }
  };
  const changePassword = () => {
    // Add logic to change the password
    // You can use the route.params.email to identify the user
    // and update the password in your backend
    // After changing the password, navigate to a success screen or login screen
  };

  return (
    <View style={TextInP.container}>
      <LogoHeaderGlobel navigation={navigation} />

      <Text style={TextInP.heading}>Enter New Password</Text>
      <TextInput
        style={TextInP.Fileds}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={'grey'}
      />
      <TextInput
        style={TextInP.Fileds}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={'grey'}
      />
      <View style={TextInP.lognBtnParent}>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={TextInP.lognBtn}
        >
          <TouchableOpacity onPress={changePassword} >
            <Text style={{
              color: "#fff", fontWeight: '600',
            }}
            >Change Password</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export const TextInP = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start', // Align items vertically in the center
    alignItems: 'start', // Align items horizontally in the center
    paddingHorizontal: 10
  },
  heading: {
    color: "#000",
    fontWeight: '700',
    fontSize: 28,
    padding: 10

  },
  Fileds: {
    marginTop: hp(2),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    paddingLeft: 20,
    borderCurve: '',
    color: "#000",
    placeholderTextColor: "#000"
  },
  lognBtnParent: {
    justifyContent: 'center', // Align children horizontally in the center
    alignItems: 'center', // Align children vertically in the center
  },
  lognBtn: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(6),
    borderRadius: 50,
    marginVertical: 20,
  },
});
export default EnterNewPasswordScreen;
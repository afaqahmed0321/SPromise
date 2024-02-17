import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { uemail } from '../recoil/Users/GetUsers';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import UpdatedPassword from '../Network/Users/UpdatePassword';

const EnterNewPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailID, setEmail] = useRecoilState(uemail);

  
  const changePassword = async () => {

    console.log("emailllllll", emailID,"paswordddddd", password);
    const isValidPassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };
    try {
      if (password === '') {
        ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
        return;
      } else if (!isValidPassword(password)) {
        ToastAndroid.show('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters', ToastAndroid.LONG);
        return;
      } 

      // Make an API call to change the password
      const response = await UpdatedPassword(emailID, password);
      console.log("responce", response);
      // Check the response and navigate accordingly
      if (response.status == 400) {
        // Password changed successfully
        ToastAndroid.show('Password changed successfully', ToastAndroid.LONG);
        navigation.navigate('LoginScreen');
       
      } else {
        // Handle the case where password change fails
        ToastAndroid.show('Failed to change password. Please try again.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      ToastAndroid.show('An unexpected error occurred. Please try again.', ToastAndroid.LONG);
    }
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

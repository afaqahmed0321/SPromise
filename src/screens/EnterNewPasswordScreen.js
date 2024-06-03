import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { uNumber, uemail } from '../recoil/Users/GetUsers';
import { useRecoilState } from 'recoil';
import UpdatedPassword from '../Network/Users/UpdatePassword';

const EnterNewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailID, setEmail] = useRecoilState(uemail);
  const [userNumber, setUserNumber] = useRecoilState(uNumber);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePassword(text);
  };

  const changePassword = async () => {
    if (password === '') {
      ToastAndroid.show('Please Enter Password', ToastAndroid.LONG);
      return;
    } else if (passwordError !== '') {
      ToastAndroid.show('Please enter a valid password', ToastAndroid.LONG);
      return;
    } else if (password !== confirmPassword) {
      ToastAndroid.show('Password is not Confirmed', ToastAndroid.LONG);
      return;
    }

    try {
      const response = await UpdatedPassword(userNumber, password);
      if (response.status === 200) {
        ToastAndroid.show('Password changed successfully', ToastAndroid.LONG);
        navigation.navigate('LoginScreen');
      } else {
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
        onChangeText={handlePasswordChange}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry
      />
      {passwordError !== '' && (
        <Text style={TextInP.errorText}>{passwordError}</Text>
      )}
      <TextInput
        style={TextInP.Fileds}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={'grey'}
        secureTextEntry
      />
      <View style={TextInP.lognBtnParent}>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={TextInP.lognBtn}
        >
          <TouchableOpacity onPress={changePassword}>
            <Text style={{ color: "#fff", fontWeight: '600' }}>Change Password</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export const TextInP = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
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
    color: "#000",
  },
  lognBtnParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lognBtn: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(6),
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  },
});

export default EnterNewPasswordScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import { uNumber, uemail } from '../recoil/Users/GetUsers';
import { useRecoilState } from 'recoil';
import UpdatedPassword from '../Network/Users/UpdatePassword';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
const EnterNewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailID, setEmail] = useRecoilState(uemail);
  const [userNumber, setUserNumber] = useRecoilState(uNumber);
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
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
  const toggleOldPasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsCPasswordVisible(!isCPasswordVisible);
  };

  const changePassword = async () => {
    if (password === '') {
      Toast.show({
        type: 'info',
        text1: 'Please Enter Password',
        visibilityTime: 3000, // 3 sec
          topOffset: 30,
          bottomOffset: 40,
      });
      return;
    } else if (passwordError !== '') {
      Toast.show({
        type: 'info',
        text1: 'Please enter a valid password',
        visibilityTime: 3000, // 3 sec
          topOffset: 30,
          bottomOffset: 40,
      });
      return;
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'info',
        text1: 'Password is not Confirmed',
        visibilityTime: 3000, // 3 sec
          topOffset: 30,
          bottomOffset: 40,
      });
      return;
    }
  
    try {
      const response = await UpdatedPassword(userNumber, password);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Password changed successfully',
          visibilityTime: 3000, // 3 sec
            topOffset: 30,
          bottomOffset: 40,
        });
        navigation.navigate('LoginScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to change password. Please try again.',
          visibilityTime: 3000, // 3 sec
            topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred. Please try again.',
        visibilityTime: 3000, // 3 sec
          topOffset: 30,
          bottomOffset: 40,
      });
    }
  };

  return (
    <View style={TextInP.container}>
      <LogoHeaderGlobel navigation={navigation} />
      <Text style={TextInP.heading}>Enter New Password</Text>
      <View >
      <TextInput
        style={TextInP.Fileds}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry={!isPasswordVisible}      />
      <TouchableOpacity
          style={{ position: 'absolute', right: wp(8.5), top: hp(2.7) }}
          onPress={toggleOldPasswordVisibility}>
          <Icon name={!isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError !== '' && (
        <Text style={TextInP.errorText}>{passwordError}</Text>
      )}
       <View >
      <TextInput
        style={TextInP.Fileds}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={'grey'}
        secureTextEntry={!isCPasswordVisible}      
      />
      <TouchableOpacity
          style={{ position: 'absolute', right: wp(8.5), top: hp(2.7) }}
          onPress={toggleConfirmPasswordVisibility}>
          <Icon name={!isCPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
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
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export const TextInP = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'start',
    paddingHorizontal: wp(5),
    alignSelf:"center"
  },
  heading: {
    color: "#000",
    fontWeight: '700',
    fontSize: hp(2.5),
    padding: 10,
    marginHorizontal: wp(4),

  },
  Fileds: {
    marginVertical: hp(1),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),

    // borderTopWidth:1,
    borderColor: 'transparent',
    borderCurve:'',
    color: "black",
    // borderColor:'#652D90'
    placeholderTextColor:'grey',
  },
  lognBtnParent: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
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
    marginTop: 0,
    marginLeft: 30,
  },
});

export default EnterNewPasswordScreen;

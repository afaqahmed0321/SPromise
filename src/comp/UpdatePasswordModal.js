import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Headings } from '../Styling/Headings';
import { TextInP } from '../Styling/TextInput';
import {
  CurrentPassword,
  isChangePasswordModalV,
} from '../recoil/Users/GetUsers';
import { useRecoilState } from 'recoil';
import UpdatedPassword from '../Network/Users/UpdatePassword';
import { UserNo } from '../recoil/AddPromise';

const UpdatePasswordModal = () => {
  const [passwordd, setPasswordd] = useState('');
  const [currentPassword, setCurrentPassword] = useRecoilState(CurrentPassword);
  const [currentPasswor, setCurrentPasswor] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [isDrawerV, setIsDrawerV] = useRecoilState(isChangePasswordModalV);
  const [passwordError, setPasswordError] = useState('');
console.log("user pwd",currentPassword)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPasswordd(text);
    validatePassword(text);
  };

  const UpdatePassword = async () => {
    if (currentPassword !== currentPasswor) {
      console.log("pwd from recoil",currentPassword,"password from field",currentPasswor)
      ToastAndroid.show('Old password does not match', ToastAndroid.LONG);
      return;
    }

    if (passwordd !== Confirmpassword) {
      console.log("pwd from passwordd",passwordd,"password from Confirmpassword",Confirmpassword)

      ToastAndroid.show('Confirm passwords do not match', ToastAndroid.LONG);
      return;
    }

    if (passwordd === currentPasswor) {
      ToastAndroid.show('Old password cannot be New password', ToastAndroid.LONG);
      return;
    }

    if (passwordError !== '') {
      ToastAndroid.show('Please enter a valid password', ToastAndroid.LONG);
      return;
    }

    
    try {
      const res = await UpdatedPassword(userN, passwordd);
      if (res.status === 200) {
        ToastAndroid.show('Password changed successfully', ToastAndroid.LONG);
        setIsDrawerV(false);
      } else {
        ToastAndroid.show('Failed to change password. Please try again.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      ToastAndroid.show('An unexpected error occurred. Please try again.', ToastAndroid.LONG);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleCPasswordVisibility = () => {
    setIsCPasswordVisible(!isCPasswordVisible);
  };

  return (
    <View
      style={{
        height: "auto",
        justifyContent: 'center',
        borderWidth: 0.5,
        width: wp(90),
        borderRadius: wp(2),
        borderColor: '#652D90',
        backgroundColor: 'white',
        paddingVertical: wp(5)
      }}>
      <TouchableOpacity
        onPress={() => setIsDrawerV(false)}
        style={{ marginLeft: wp(79) }}>
        <Font color="#652D90" name="close" size={30} />
      </TouchableOpacity>
      <Text
        style={[Headings.Input3, { alignSelf: 'flex-start', marginLeft: wp(8) }]}>
        Old Password
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={[TextInP.Fileds, { width: wp(80) }]}
          placeholderTextColor="#000"
          placeholder="*******"
          onChangeText={setCurrentPasswor}
          value={currentPasswor}
          secureTextEntry={!isOldPasswordVisible}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: wp(8.5), top: hp(2.5) }}
          onPress={toggleOldPasswordVisibility}>
          <Icon name={!isOldPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text
        style={[Headings.Input3, { alignSelf: 'flex-start', marginLeft: wp(8) }]}>
        Create Password
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={[TextInP.Fileds, { width: wp(80) }]}
          placeholder="*******"
          onChangeText={handlePasswordChange}
          placeholderTextColor="#000"
          value={passwordd}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: wp(8.5), top: hp(2.5) }}
          onPress={togglePasswordVisibility}>
          <Icon name={!isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError !== '' && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      <Text
        style={[Headings.Input3, { alignSelf: 'flex-start', marginLeft: wp(8) }]}>
        Confirm Password
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={[TextInP.Fileds, { width: wp(80) }]}
          placeholder="*******"
          placeholderTextColor="#000"
          onChangeText={setConfirmPassword}
          value={Confirmpassword}
          secureTextEntry={!isCPasswordVisible}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: wp(8.5), top: hp(2.5) }}
          onPress={toggleCPasswordVisibility}>
          <Icon name={!isCPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: hp(2), justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={UpdatePassword}
          style={{ marginLeft: wp(6) }}>
          <Font color="green" name="check" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdatePasswordModal;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginVertical: 5,
    marginHorizontal: 30,
  },
});

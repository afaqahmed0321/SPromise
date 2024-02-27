import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ToastAndroid} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Font from 'react-native-vector-icons/Fontisto';
import React, {useState, useEffect} from 'react';
import {Headings} from '../Styling/Headings';
import {TextInP} from '../Styling/TextInput';
import {
  CurrentPassword,
  isChangePasswordModalV,
} from '../recoil/Users/GetUsers';
import {useRecoilState} from 'recoil';
import UpdatedPassword from '../Network/Users/UpdatePassword';
import {UserNo} from '../recoil/AddPromise';

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

  const UpdatePassword = async () => {
    console.log(currentPassword);
    console.log(currentPasswor);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (currentPassword === currentPasswor) {
      console.log('Matached password');
      if (passwordd === Confirmpassword) {
        if (passwordRegex.test(passwordd)) {
          const NewPass = passwordd;
          console.log('Updating password...');
          console.log(NewPass, 'UserNumber');
          console.log(NewPass, 'New password');
          const res = await UpdatedPassword(userN, NewPass);
          console.log(res, 'Adapted password');
          if (res.status === 200) {
            ToastAndroid.show('Password Change successfully', ToastAndroid.LONG);
            setIsDrawerV(false);
          }
        } else {
          ToastAndroid.show('Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters', ToastAndroid.LONG);
        }
      } else {
         ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
      }
    } else {
       ToastAndroid.show('Old password does not match', ToastAndroid.LONG);
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
        height: hp(45),
        justifyContent: 'center',
        borderWidth: 0.5,
        width: wp(90),
        // alignSelf: 'center',
        borderRadius: wp(2),
        borderColor: '#652D90',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => setIsDrawerV(false)}
        style={{marginLeft: wp(79)}}>
        <Font color="#652D90" name="close" size={30} />
      </TouchableOpacity>
      <Text
        style={[Headings.Input3, {alignSelf: 'flex-start', marginLeft: wp(8)}]}>
        Old Password
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={[TextInP.Fileds, {width: wp(80)}]}
          placeholderTextColor="#000"
          placeholder="*******"
          onChangeText={setCurrentPasswor}
          value={currentPasswor}
          secureTextEntry={!isOldPasswordVisible}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: wp(8.5), top: hp(2.5)}}
          onPress={toggleOldPasswordVisibility}>
          <Icon name={!isOldPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <Text
        style={[Headings.Input3, {alignSelf: 'flex-start', marginLeft: wp(8)}]}>
        Create Password
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={[TextInP.Fileds, {width: wp(80)}]}
          placeholder="*******"
          onChangeText={setPasswordd}
          placeholderTextColor="#000"
          value={passwordd}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: wp(8.5), top: hp(2.5)}}
          onPress={togglePasswordVisibility}>
          <Icon name={!isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <Text
        style={[Headings.Input3, {alignSelf: 'flex-start', marginLeft: wp(8)}]}>
        Confirm Password
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={[TextInP.Fileds, {width: wp(80)}]}
          placeholder="*******"
          placeholderTextColor="#000"
          onChangeText={setConfirmPassword}
          value={Confirmpassword}
          secureTextEntry={!isCPasswordVisible}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: wp(8.5), top: hp(2.5)}}
          onPress={toggleCPasswordVisibility}>
          <Icon name={!isCPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: hp(2), justifyContent:'center', alignItems:'center'}}>
     
          <TouchableOpacity
            onPress={UpdatePassword}
            style={{marginLeft: wp(6)}}>
           <Font color="green" name="check" size={30} />
          </TouchableOpacity>
      
      </View>
    </View>
  );
};

export default UpdatePasswordModal;

const styles = StyleSheet.create({});

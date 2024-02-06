import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LogoHeader from '../comp/LogoHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../comp/Buttons';
import { commonStyles } from '../Styling/buttons';
import LinearGradient from 'react-native-linear-gradient';
import { TextInP } from '../Styling/TextInput';

const AppLaunchScreen = ({ navigation }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{ marginTop: hp(9) }}>
        <LogoHeader />
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          width: wp(70),
        }}>
        <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>
          Explore the app
        </Text>
        <Text style={{ textAlign: 'center', marginVertical: 10, color: '#000', fontSize: 17 }} numberOfLines={2}>
          Turning words into actions
        </Text>
      </View>

      <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={commonStyles.launchlognBtn}
        >

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{
              color: 'white', fontSize: 16,
              fontWeight: 'bold',
              width: wp(95),
              alignItems: 'center',
              textAlign: 'center',
              paddingVertical: 8,
              paddingHorizontal: 5,

            }}>Log In</Text>
          </TouchableOpacity>

        </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <LinearGradient
          colors={['#73B6BF', '#2E888C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={commonStyles.SignUpBtn}
        >
            <Text style={{
              color: 'white', fontSize: 16,
              fontWeight: 'bold',
              width: wp(90),
              alignItems: 'center',
              textAlign: 'center',
            }}>Create Account</Text>
        </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>

  );
};

export default AppLaunchScreen;

const styles = StyleSheet.create({});

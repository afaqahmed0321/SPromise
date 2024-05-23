import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

export const commonStyles = StyleSheet.create({
  lognBtn: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    borderRadius: 50,
  },
  lognBtn1: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(5),
    borderRadius: 50,
  },
  SignUpBtn: {
    backgroundColor: '#2E888C',
    justifyContent: 'center',
    borderRadius: wp(50),
    height: hp(7),
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    alignItems: 'center',
  },
  ForgetVerify: {
    width: wp(90),
    backgroundColor: '#2E888C',
    justifyContent: 'center',
    borderRadius: wp(50),
    height: hp(7),
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    alignItems: 'center',
  },
  SocialBtn: {
    width: wp(90),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  ActionBtn: {
    // width: wp(35),
    width: wp(25),
    height: hp(5),
    backgroundColor: '#32C35B',
    borderRadius: wp(25),
    justifyContent: 'center',
    alignItems: 'center',

  },
  VerifyButton:{
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color:'white',
    width: wp(90),
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    borderRadius: 50,
    paddingVertical: 8,
    textAlign:"center"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8DADC', // Change the color as needed
  },
  text: {
    paddingVertical: 15,
    color:'black'
  },
});

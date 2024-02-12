import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

export const commonStyles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // text: {
    // fontSize: 18,
    // color: 'black',
  // },

  lognBtn: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    paddingHorizontal: 5,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  SignUpBtn: {
    backgroundColor: '#2E888C',
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    paddingHorizontal: 5,
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
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SocialBtn: {
    width: wp(90),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    marginTop: hp(2),
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
    paddingHorizontal: 10,
    color:'black'
  },
});

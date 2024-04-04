import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const DashBoardStyling = StyleSheet.create({
  MainCard: {
    width: wp(90),
    // height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical:10
  },
  MiniCard: {
    width: wp(90),
    // height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: '',
    borderRadius: 32,

  },
  PromiseGoal:{width: wp(75), height: hp(5),},
  PromiseReward:{
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    // height: hp(10),
    marginTop: hp(1),
    // borderWidth:1,
    marginVertical:10
  },
  MainCardHome: {
    width: wp(85),
    // height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical:10
  }
});

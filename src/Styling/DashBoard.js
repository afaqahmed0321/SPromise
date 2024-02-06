import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const DashBoardStyling = StyleSheet.create({
  MainCard: {
    width: wp(90),
    height: hp(28),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  MainCardForOnGoingPromises: {
    width: '95%',
    height: hp(25),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
  },

  MiniCard: {
    width: wp(90),
    // height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
    borderRadius: 32,

  },
  PromiseGoal:{width: wp(75), height: hp(5),},
  PromiseReward:{
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    height: hp(3),
    marginTop: hp(1)
    // borderWidth:1,
  }
});

import { StyleSheet } from 'react-native';
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
    paddingVertical: 10
  },
  MiniCard: {
    width: wp(90),
    height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: '',
    borderRadius: 32,

  },
  PromiseGoal: { width: wp(75) },
  acionStatement: { width: wp(75) },

  PromiseGoal1: { width: wp(75), height: hp(5), paddingHorizontal: 15 },

  PromiseReward: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  PromiseReward1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"center",
  },
  MainCardHome: {
    width: wp(85),
    // height: hp(12),
    marginTop: hp(1.4),
    borderRadius: wp(2),
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical: 10
  }
});

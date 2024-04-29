import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const TextInP = StyleSheet.create({

  Fileds: {
    marginVertical: hp(1),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    paddingLeft: 20,
    // borderTopWidth:1,
    borderColor: 'transparent',
    borderCurve:'',
    color: "grey",
    // borderColor:'#652D90'
    placeholderTextColor:'grey'
  },
  EmailFiled: {
    marginVertical: hp(1),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    paddingLeft: 20,
    // borderTopWidth:1,

    borderCurve:'',
    color: "#000",
    // borderColor:'#652D90'
    placeholderTextColor:"#000"
  
  },
  nameFileds: {
    marginVertical: hp(1),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    width: wp(38),

  },
  InputT: {
    marginLeft: '10%'
  },
  LogInButton: {
    // backgroundImage: 'linear-gradient(180deg, #E4A936 0%, #EE8347 100%)',
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
  SignInButton: {
    // backgroundImage: 'linear-gradient(180deg, #E4A936 0%, #EE8347 100%)',
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
    paddingVertical: 16,
    textAlign:"center"
  }



});
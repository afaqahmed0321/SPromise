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
    color: "black",
    // borderColor:'#652D90'
    placeholderTextColor:'grey'
  },
  Fileds1: {
    marginVertical: hp(1),
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    width: wp(82),
    height: hp(6),
    paddingLeft: 20,
    // borderTopWidth:1,
    borderColor: 'transparent',
    borderCurve:'',
    color: "black",
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
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color:'white',
    flex:1,
    flexDirection:"column",
    textAlignVertical:"center"
  },
  SignInButton: {
    // backgroundImage: 'linear-gradient(180deg, #E4A936 0%, #EE8347 100%)',
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color:'white',
    flex:1,
    flex:1,
    flexDirection:"column",
    textAlignVertical:"center",
  },
  SignInButton1: {
    // backgroundImage: 'linear-gradient(180deg, #E4A936 0%, #EE8347 100%)',
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color:'white',
    flex:1,
    flexDirection:"column",
    textAlignVertical:"center",
    width:wp(90),
    justifyContent:"center",
    textAlign:"center"
  }



});
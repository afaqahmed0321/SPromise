import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const Headings = StyleSheet.create({

  InputH:{
    fontWeight:'bold',
    marginBottom:20,
    color: 'black',
    fontSize:hp(2.5),
    marginHorizontal:10

  },
  Input3:{
    fontWeight:'bold',
    color: 'black',
    fontSize:hp(1.6),
    marginHorizontal:10,
  },
  
  Input31:{
    fontWeight:'bold',
    color: 'black',
    fontSize:hp(1.6),
    marginTop: 5,
    fontWeight:'600',
  },
  InputCustom:{
    fontWeight:'bold',
    color: 'black',
    fontSize:hp(1.8),
    marginHorizontal:10,
    alignContent: 'center',
    width:wp(18),
    lineHeight:25,
  },
  Input6:{
    fontWeight:'bold',
    color: 'black',
    fontSize:hp(1.2),
    
  },
  Input5:{
    fontWeight:'bold',
    color: 'black',
    fontSize:hp(2),
    
  },
  h1:{
    fontSize: hp(3.5),
    fontWeight:'bold', 
    color:'black'
  }, 
  h1ForReviewpage:{
    color: '#FFFFFF',
    fontSize:hp(5),
  },
  h2ForReviewpage:{
    color: '#FFFFFF',
    fontSize:hp(3),
  },
  h3ForReviewpage:{
    color: '#FFFFFF',
    fontSize:hp(1.8),
    fontWeight:'bold'
  },
  h4ForReviewpage:{
    color: '#FFFFFF',
    fontSize:hp(1),
  },

});
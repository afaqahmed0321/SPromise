import {StyleSheet, Text, View, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import React from 'react';

const LogoHeader = () => {
  return (
    <View style={styles.mainC}>
      <Image
        source={require('../source/mainLogo.jpg')} // Replace with the actual path to your image
        style={styles.ImageStyle} // Define the dimensions of the image
      />
      <Text style={{fontSize: 32, fontWeight:'bold', color:'black', marginTop:hp(2)}}>
        SNAP PROMISE
      </Text>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  mainC:{
    width: '100%', 
    justifyContent:'center',
    alignItems:'center'
  },
  ImageStyle:{
    width:200,
    
    borderRadius: hp(25)/2, 

  }
});

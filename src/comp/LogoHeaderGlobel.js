import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';

const LogoHeaderGlobel = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Can go back:', navigation.canGoBack());
  }, [navigation]);

  const handleBack = () => {
    console.log('Back button pressed'); // Debugging
    if (navigation.canGoBack()) {
      console.log('Can go back');
      navigation.goBack();
    } else {
      console.log('Cannot go back');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignSelf:'flex-start', padding:wp(4), paddingBottom:0}}>
        {navigation.canGoBack() && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../source/mainLogo.jpg')}
            style={styles.imageStyle}
          />
          <Text style={styles.title}>SNAP PROMISE</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backButton: {
    // position: 'absolute',
    // left: wp(3),
    // top: hp(1.5),
  },
  header: {
    width: wp(100),
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(5),
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: hp(1.5),
  },
});

export default LogoHeaderGlobel;

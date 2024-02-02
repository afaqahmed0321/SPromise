// import {
//   StyleSheet,
//   Text,
//   View,
  
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import Icon from 'react-native-vector-icons/Ionicons';
// import EvilIcon from 'react-native-vector-icons/EvilIcons';


// const LogoHeaderGlobel = ({navigation}) => {
//   return (
//     <View style={{alignItems: 'center', }}>
//         <TouchableOpacity style={{position: 'absolute', left: wp(3), top: hp(1.5)}}>
//           <EvilIcon
//             name="arrow-left" 
//             size={40}
//             color="black"
//             onPress={() => navigation.goBack()}
//           />
//         </TouchableOpacity>
//       <View style={{ width: wp(100),height: hp(20),  justifyContent: 'center', alignItems:'center' }}>
//         <View style={{justifyContent: 'center', alignItems:'center' }}>
//           <View style={styles.LogoC}>
//             <Image
//               source={require('../source/mainLogo.jpg')}
//               style={styles.ImageStyle}
//             />
//           </View>
//           <Text
//             style={{
//               fontSize: hp(2.5),
//               fontWeight: 'bold',
//               color: 'black',
//               marginTop: hp(1.5),
//             }}>
//             SNAP PROMISE
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LogoHeaderGlobel;

// const styles = StyleSheet.create({
//   LogoC: {
//     width: hp(10),
//     height: hp(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ImageStyle: {
//     width: hp(10),
//     height: hp(10),
//     borderRadius: hp(25) / 2,
//     resizeMode: 'cover',
//   },
// });


import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
// import EvilIcon from 'react-native-vector-icons/EvilIcons';

import FontAw5 from 'react-native-vector-icons/FontAwesome5';


const LogoHeaderGlobel = () => {
  const navigation = useNavigation();

  // Function to handle the back button press
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={{ position: 'absolute', left: wp(3), top: hp(1.5) }} onPress={handleBack}>
          {/* <EvilIcon
            name="arrow-left"
            size={40}
            color="black"
          /> */}
         <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />

        </TouchableOpacity>
      )}
      <View style={{ width: wp(100), height: hp(20), justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.LogoC}>
            <Image
              source={require('../source/mainLogo.jpg')}
              style={styles.ImageStyle}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              marginTop: hp(1.5),
            }}>
            SNAP PROMISE
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LogoHeaderGlobel;

const styles = StyleSheet.create({
  LogoC: {
    width: hp(10),
    height: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(25) / 2,
    resizeMode: 'cover',
  },
});

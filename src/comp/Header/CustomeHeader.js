import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomHeader = ({ title,navigation  }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={()=>(
        navigation.goBack())}>
      <Feather name="user" color="black" size={24} />
      </TouchableOpacity>
      <Text style={{ marginLeft: 8, fontSize: 16 }}>My Promise Network</Text>
    </View>
  );
};

export default CustomHeader;
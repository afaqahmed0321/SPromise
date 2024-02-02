import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {commonStyles} from '../Styling/buttons'

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={commonStyles.lognBtn} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomButton;

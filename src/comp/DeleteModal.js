import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Are you sure you want to delete your account?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, { backgroundColor: '#652D90' }]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#652D90' }]}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modal: {
    backgroundColor: 'white',
    marginHorizontal: hp(2),
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: hp(2.2),
    marginBottom: wp(3),
    textAlign: 'center',
    color:'black'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal:16,
    borderRadius: 5,
    marginHorizontal: hp(1),
  },
  buttonText: {
    fontSize: hp(2),
    color: 'white',
  },
});

export default DeleteModal;

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ToastAndroid,
  } from 'react-native';
  import EvilIcon from 'react-native-vector-icons/FontAwesome5';
  import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../helper';



const ReportIssues = ({ navigation }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = async () => {
        setIsLoading(true)
        let userNo = await AsyncStorage.getItem('userNo');
        let emailID = await AsyncStorage.getItem('Email');
        const userData = {
          title: title,
          description: description,
          status: 'NEW',
          emailID: emailID,
          createdBy: userNo
        };    
        if (title && description) {
          try {
            const response = await axios.post(`${API_URL}/api/Report/reportSave`, userData);
            if (response.data.code === 100) {
              ToastAndroid.showWithGravityAndOffset(
                'A report has been created',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              setTitle('');
              setDescription('');
              setIsLoading(false);
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'Failed', 'Report Failed.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
            ToastAndroid.showWithGravityAndOffset(
                'Error', 'Failed to report issue. Please try again.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
          }
        } else {
          setIsLoading(false);
          ToastAndroid.showWithGravityAndOffset(
            'Invalid Data', 'Please make sure all fields are filled correctly.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        setIsLoading(false); 
      };
    

    const handleClear = () => {
        setTitle('');
        setDescription('');
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (

        <View style={{ backgroundColor: '#E4EEE6', flex: 1 }} >
            <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center' }}>
                {navigation.canGoBack() && (
                    <TouchableOpacity
                        onPress={handleBack}
                        style={{ marginLeft: wp(6) }}>
                        <EvilIcon name="arrow-alt-circle-left" size={30} color="#652D90" />
                    </TouchableOpacity>
                )}
                <View style={{ marginLeft: wp(6) }}>
                    <Text style={{ fontSize: hp(2.3), fontWeight: 'bold', color: "#652D90" }}>
                        Report Issue
                    </Text>

                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor='grey'
                    />
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor='grey'
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleClear}>
                        <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4EEE6',
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: hp(2),
        fontWeight: 'bold',
        color: '#652D90',
    },
    form: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
        color:'black'
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#652D90',
        borderRadius: 5,
        paddingVertical: 12,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: hp(1.6),
    },
});

export default ReportIssues;

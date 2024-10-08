import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { code, uNumber, uemail } from '../recoil/Users/GetUsers';
import PasswordVerification from '../Network/PasswordVerification';
import { API_URL } from '../../helper';

const ForgetPasswordEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [Code, setCode] = useRecoilState(code);
    const [Semail, setSemail] = useRecoilState(uemail);
    const [userNumber, setUserNumber] = useRecoilState(uNumber);

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const sendOTP = async () => {
        if (!validateEmail(email)) {
            ToastAndroid.show(
                'Please enter a valid email',
                ToastAndroid.LONG,
            );
            return;
        }
        const mail = email.toLowerCase();
        const encodedEmail = encodeURIComponent(mail);
 
        await axios.get(`${API_URL}/api/Users/getUsers?searchString=${mail}`)

            .then(async (response) => {
                setUserNumber(response?.data?.users?.[0].userNo)
                if (response?.data?.users?.[0].loginType !== 'Manual') {
                    ToastAndroid.show('User has Logged in with Google', ToastAndroid.LONG);
        
                } else {
                    let response = await PasswordVerification(mail)
                    try {
                        setCode(response);
                        navigation.navigate('EnterOTPScreen', { Code, email, userNumber });
                        setSemail(email);
                        console.log(code)
                    }
                    catch {
                        console.log("Error in forgot password", error);
                    };
                }

            })   
    };


    const onChangeEmail = async text => {
        setEmail(text);
    };

    return (
        <View style={TextInP.container}>
            <LogoHeaderGlobel navigation={navigation} />
            <View>
                <Text style={TextInP.heading}>Forgot Password</Text>
            </View>
            <TextInput
                style={TextInP.Fileds}
                value={email}
                onChangeText={text => onChangeEmail(text)}
                placeholder="Enter your email here"
                placeholderTextColor={'grey'}
            />
            <View style={TextInP.lognBtnParent}>
                <TouchableOpacity onPress={sendOTP}>
                <LinearGradient
                    colors={['#E4A936', '#EE8347']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={TextInP.lognBtn}
                >
                        <Text style={{ color: "#fff", fontWeight: '600' }}>Send OTP</Text>
                </LinearGradient>
                    </TouchableOpacity>
            </View>
        </View>
    );
};

export const TextInP = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'start',
        paddingHorizontal: 10
    },
    heading: {
        color: "#000",
        fontWeight: '700',
        fontSize: hp(2.2),
        padding: 10
    },
    Fileds: {
        marginTop: hp(1),
        backgroundColor: '#F6E2FF',
        borderRadius: wp(50),
        alignItems: 'center',
        paddingLeft: 20,
        borderCurve: '',
        color: "#000",
        placeholderTextColor: "#000"
    },
    lognBtnParent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lognBtn: {
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(50),
        height: hp(6),
        borderRadius: 50,
        marginVertical: 12,
    },
});

export default ForgetPasswordEmailScreen;

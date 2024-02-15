import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoHeaderGlobel from '../comp/LogoHeaderGlobel';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { code, uemail } from '../recoil/Users/GetUsers';

const ForgetPasswordEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [Code, setCode] = useRecoilState(code)
  const [Semail, setSemail] = useRecoilState(uemail);



    const sendOTP = async () => {
        const encodedEmail = encodeURIComponent(email);
        console.log("this is email", encodedEmail)
        await axios.get(`https://snappromise.com:8080/getOTP?emailID=${encodedEmail}&isForgot=${true}`)
            .then((res) => {
                console.log("Forget password is hitted", res);
                setCode(res.data.code)
                navigation.navigate('EnterOTPScreen', { Code, email });
                setSemail(email)
            })
            .catch((error) => {
                console.log("Error in forgot password", error);
                // navigation.navigate('EnterOTPScreen', { email });
            })
        // Add logic to send OTP to the entered email
    };
    const onChangeEmail = async text => {
        // Update the Email state with the new text input
        setEmail(text);
    };
    return (
        <View style={TextInP.container}>
            <LogoHeaderGlobel navigation={navigation} />
            <View>
                <Text style={TextInP.heading}>
                    Forgot Password
                </Text>
            </View>
            <TextInput
                style={TextInP.Fileds}
                value={email}
                onChangeText={text => onChangeEmail(text)}
                placeholder="Enter your email here"
                placeholderTextColor={'grey'}
            />
            <View style={TextInP.lognBtnParent}>
                <LinearGradient
                    colors={['#E4A936', '#EE8347']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={TextInP.lognBtn}
                >
                    <TouchableOpacity onPress={sendOTP}>
                        <Text style={{
                            color: "#fff", fontWeight: '600',
                        }}  >Send OTP</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};



export const TextInP = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start', // Align items vertically in the center
        alignItems: 'start', // Align items horizontally in the center
        paddingHorizontal: 10
    },
    heading: {
        color: "#000",
        fontWeight: '700',
        fontSize: 24,
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
        justifyContent: 'center', // Align children horizontally in the center
        alignItems: 'center', // Align children vertically in the center
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

import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView} from 'react-native';

function SocialWeb({ navigation }) {
    const route = useRoute();
    const { isTwitterApiCall, twitterResponse, linkDinResponse } = route.params;

    return (
        <>
            <SafeAreaView style={{ height: '100%' }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        marginLeft: wp(2),
                        height: hp(5),
                        marginTop: hp(1),
                    }}>
                    <FontAw5
                        name="arrow-alt-circle-left"
                        size={30}
                        color="#6650A4"
                    />
                </TouchableOpacity>
                <WebView
                    source={{
                        uri: isTwitterApiCall ? twitterResponse : linkDinResponse,
                    }}
                    style={{ height: hp(90) }}
                />
            </SafeAreaView>
        </>
    );
}

export default SocialWeb;

import React from 'react'
import { View } from 'react-native';
import WebView from 'react-native-webview';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function CustomWebView({ route }) {
    const { uri } = route.params.uri;
        console.log("urllll", route);

    return (
        
        <View style={{ flex: 1, width: wp(100),  }}>
            <WebView
                source={{ uri: route.params.uri }}
                style={{height: '100%', width: wp(100)}}
                onError={syntheticEvent =>
                    console.log('WebView error: ', syntheticEvent.nativeEvent)
                }
            />
        </View>
    );
}

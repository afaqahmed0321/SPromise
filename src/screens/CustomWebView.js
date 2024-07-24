import React, {useEffect} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isLeftDrawerV } from '../recoil/HomeScreenStates';
import { useRecoilState } from 'recoil';


export default function CustomWebView({route}) {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);

  const {uri} = route.params.uri;
  useEffect(() => {
    setIsDrawerV(false);
  },[]);
  return (
    <View style={{flex: 1, width: wp(100)}}>
      <WebView
        source={{uri: route.params.uri}}
        style={{height: '100%', width: wp(100)}}
        onError={syntheticEvent =>
          console.log('WebView error: ', syntheticEvent.nativeEvent)
        }
      />
    </View>
  );
}

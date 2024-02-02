import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const TwitterWebView = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://api.twitter.com/oauth/authorize?oauth_token=8xjIRQAAAAABrP4gAAABjHxh1X8',
        }}
        style={styles.webview}
        onError={syntheticEvent =>
          console.log('WebView error: ', syntheticEvent.nativeEvent)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default TwitterWebView;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Auth from './Navi';
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';





export default class App extends React.Component {
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <Auth />
      </RecoilRoot>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({});


import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

import {useRecoilState} from 'recoil';
import {
  selectedVideoR,
} from '../../recoil/AddPromise';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Player = () => {
  const navigation = useNavigation();
   const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [licked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({currentTime: 0});

  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();

  const slider = sec => {
    let mints = parseInt(sec / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(sec) % 60).toString().padStart(2, '0');
    return `${mints}:${secs}`;
  };

  const FullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };
  const handleScreenTap = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };
  return (
    

    <View style={{flex: 1}}>
    <View style={{height: hp(27)}}>
      <TouchableOpacity
        onPress={() => {
          setClicked(true);
          setTimeout(() => {
            setClicked(false);
          }, 2000);
        }}
        style={!fullScreen ? styles.halfScreen : styles.fullScreen}>
        <Video
          ref={ref}
          onProgress={x => {
            setProgress(x);
          }}
          paused={paused}
          source={{uri: selectedVideo}}
          style={!fullScreen ? styles.halfScreen : styles.fullScreen}
          resizeMode="contain"
          muted={true}
        />

        {licked == true && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          { !fullScreen ? (  <TouchableOpacity style={{top:0, position:'absolute', right: 2}}
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="close" size={30} color="white" />
            </TouchableOpacity>):null }
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.PlayerBt}
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) - 10);
                }}>
                <Entypo
                  name="controller-fast-backward"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}
                style={[styles.PlayerBt, styles.playBt]}>
                {paused ? (
                  <Entypo name="controller-play" size={30} color="white" />
                ) : (
                  <Entypo name="controller-paus" size={30} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.PlayerBt}
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) + 10);
                }}>
                <Entypo
                  name="controller-fast-forward"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                !fullScreen ? styles.halfsliderSec : styles.fullsliderSec
              }>
              <Text style={{color: 'white'}}>
                {slider(progress.currentTime)}
              </Text>
              <Slider
                style={
                  fullScreen
                    ? {width: '55%', height: 40, marginHorizontal: hp(1)}
                    : {width: 200, height: 40}
                }
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={x => {
                  ref.current.seek(x);
                  setProgress({currentTime: x});
                }}
                value={progress.currentTime}
              />
              <Text style={{color: 'white'}}>
                {slider(progress.seekableDuration)}
              </Text>
              <TouchableOpacity
                style={{marginLeft: hp(2)}}
                onPress={FullScreen}>
                <MaterialCommunityIcons
                  name="fullscreen"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
   
  </View>
  );
};

export default Player;


const styles = StyleSheet.create({
  halfScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: hp(26),
  },
  fullScreen: {
    width: '100%',
    height: hp(43),
    backgroundColor: 'black',
  },
  PlayerBt: {},
  playBt: {
    marginHorizontal: '20%',
  },
  halfsliderSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 0,
  },
  fullsliderSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },

  Container: {
    marginTop: hp(1),
    marginBottom: hp(50),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  Card: {
    width: wp(95),
    minheight: hp(8),
    marginBottom: hp(2),
    flexDirection: 'row',
  },
  ImageSection: {
    width: wp(30),
    height: wp(30),
    borderWidth: wp(0.4),
    overflow: 'hidden',
    marginVertical: hp(0.5),
    marginHorizontal: hp(2),
  },
  Image: {
    flex: 1,
    resizeMode: 'cover',
  },
  dataSection: {
    marginLeft: wp(3),
    marginTop: hp(1),
    flex: 1,
  },
  dataText: {
    fontSize: wp(3),
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
});
// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
import {useRecoilState} from 'recoil';
import {
  promiseStatement,
  MakeaPromise,
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

  // const handelUpload = (Image)=>{
  //   const data = new FormData()
  //   data.append('file', Image)
  //   data.append('upload_preset','SnapPromise')
  //   data.append('cloud_name', 'dpwdh9zeb')

  //   fetch('http://api.cloudinary.com/v1_1/dpwdh9zeb/image/upload', {
  //     method: 'POST',
  //       body:data
  //   }).then(res=>res.json())
  //   .then(data=>{
  //     console.log(data)
  //   })
  // }

  // const videoPlayer = useRef(null);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);

  // const [paused, setPaused] = useState(false);
  // const [
  //   playerState, setPlayerState
  // ] = useState(PLAYER_STATES.PLAYING);
  // const [screenType, setScreenType] = useState('content');

  // const onSeek = (seek) => {
  //   //Handler for change in seekbar
  //   videoPlayer.current.seek(seek);
  // };

  // const onPaused = (playerState) => {
  //   //Handler for Video Pause
  //   setPaused(!paused);
  //   setPlayerState(playerState);
  // };

  // const onReplay = () => {
  //   //Handler for Replay
  //   setPlayerState(PLAYER_STATES.PLAYING);
  //   videoPlayer.current.seek(0);
  // };

  // const onProgress = (data) => {
  //   // Video Player will progress continue even if it ends
  //   if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
  //     setCurrentTime(data.currentTime);
  //   }
  // };

  // const onLoad = (data) => {
  //   setDuration(data.duration);
  //   setIsLoading(false);
  // };

  // const onLoadStart = (data) => setIsLoading(true);

  // const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  // const onError = () => alert('Oh! ', error);

  // const exitFullScreen = () => {
  //   alert('Exit full screen');
  // };

  

  // const enterFullScreen = () => {};

  // const onFullScreen = () => {
  //   // setIsFullScreen(isFullScreen);
  //   // if (screenType == 'content') setScreenType('cover');
  //   // else setScreenType('content');
  //   if (isFullScreen) {
  //     Orientation.lockToPortrait();
  //   } else {
  //     Orientation.lockToLandscape();
  //   }
  //   setIsFullScreen(!isFullScreen);
  // };

  // const renderToolbar = () => (
  //   <View>
  //     <Text style={styles.toolbar}> toolbar </Text>
  //   </View>
  // );

  // const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    // <View style={{flex: 1}}>
    //   <Video
    //     onEnd={onEnd}
    //     onLoad={onLoad}
    //     onLoadStart={onLoadStart}
    //     onProgress={onProgress}
    //     paused={paused}
    //     ref={videoPlayer}
    //     resizeMode={screenType}
    //     onFullScreen={isFullScreen}
    //     source={{
    //       uri: selectedVideo,
    //     }}
    //     // style={styles.mediaPlayer}
    //     style={!isFullScreen ? styles.halfScreen : styles.fullScreen}
    //     volume={10}
    //   />
    //   <MediaControls
    //     duration={duration}
    //     isLoading={isLoading}
    //     mainColor="#333"
    //     onFullScreen={onFullScreen}
    //     onPaused={onPaused}
    //     onReplay={onReplay}
    //     onSeek={onSeek}
    //     onSeeking={onSeeking}
    //     playerState={playerState}
    //     progress={currentTime}
    //     toolbar={renderToolbar()}
    //   />
    // </View>

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
                // dispatch(toggleModal(true));
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
    {/* {!fullScreen && (
      <View>
        <Text style={{fontWeight: 'bold'}}>Title:{selectedVideo.title}</Text>
        <Text style={{fontWeight: 'bold'}}>
          Sub Title:{selectedVideo.subtitle}
        </Text>

        <Text style={{fontWeight: 'bold'}}>Description:</Text>
        <Text>{selectedVideo.description}</Text>
        <FlatList
          data={selectedPlayer.videos}
          renderItem={renderVideos}
          keyExtractor={(item, index) => index.toString()}
          style={styles.container}
        />
      </View>
    )} */}
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

  /// Code for Videos section
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
// import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mater from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Font from 'react-native-vector-icons/Fontisto';
import { Headings } from '../../Styling/Headings';
import { commonStyles } from '../../Styling/buttons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useRecoilState } from 'recoil';
import {
  promiseStatement,
  MakeaPromise,
  selectedVideoR,
  selectedMedia,
  selectMedia,
} from '../../recoil/AddPromise';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import React, { useState, useRef } from 'react';
import {
  AllowedVideoFormatsState,
  AllowedVideoSizeState,
} from '../../recoil/Globel';
import { BlurView } from '@react-native-community/blur';
import axios from 'axios';

const PromiseStatement = ({ onTextChange }) => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [isModalV, setIsModalV] = useState(false);
  const [generatedTexts, setGeneratedTexts] = useRecoilState(promiseStatement);
  const [makePromise, setMakePromise] = useRecoilState(MakeaPromise);
  const makeprmsbg1 = ['#EB6F1F', '#AA8F3C'];
  const rqstprmsbg1 = ['#305B61', '#779A9C'];
  const [result, setResult] = useState();
  // const navigation = useNavigation();
  // const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoR);
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectMedia);
  const [attachMedia, setAttachMedia] = useRecoilState(selectedMedia);
  const [videoUri, setVideoUri] = useState(null);

  const [licked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0 });

  // const [videoUri, setVideoUri] = useState(null);
  const [VideoFarmats, setVideoFarmats] = useRecoilState(
    AllowedVideoFormatsState,
  );
  const [VideoSize, setVideoSize] = useRecoilState(AllowedVideoSizeState);

  const [fullScreen, setFullScreen] = useState(false);
  const [suggestedText, setSuggestedText] = useState(null)
  const ref = useRef();

  // const openCamera = async()=>{
  //   // setIsModalV(false)
  //   const result = await launchCamera({mediaType:'video', quality:1});
  //   // setResult(result)
  //   console.log(result)
  // }
  // const openGaleery = async ()=>{
  //   // setIsModalV(false)
  //   const result = await launchImageLibrary({mediaType:'video', quality:1});
  //   setResult(result)

  // }

  // const openCamera = async () => {
  //   const result = await launchCamera({mediaType: 'video', quality: 1});
  //   if (result.assets && result.assets.length > 0) {
  //     setSelectedVideo(result.assets[0].uri); // Use the URI of the selected image
  //     // console.log(result);
  //     // setIsModalVisible(false);
  //     // setIsModalV(false);
  //     // navigation.navigate('Player');
  //   }
  // };

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'video', quality: 1 });

    if (result.assets && result.assets.length > 0) {
      const selectedFileSize = result.assets[0].fileSize; // Size in bytes

      // Check if the file size is less than or equal to 5MB (5 * 1024 * 1024 bytes)
      // const maxSizeInBytes = VideoSize * 1024 * 1024;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedFormats = [".mp4", ".mov", ".wmv", ".qt"];
      // const allowedFormats = VideoFarmats;

      const selectedFileType = result.assets[0].type;

      if (allowedFormats.includes(selectedFileType)) {
        if (selectedFileSize <= maxSizeInBytes) {
          setSelectedVideo(result.assets[0].uri);
        } else {
          alert(`Selected file size exceeds. Please choose a smaller file.${VideoSize}`)
        }
      } else {
        alert(
          `Invalid file format. Please choose a valid video format${allowedFormats}`,
        );
      }
    }
  };

  const chooseVideo = async () => {
    console.log('cho', VideoFarmats, VideoSize);
    const result = await launchImageLibrary({ mediaType: 'video', quality: 1 });

    if (result.assets && result.assets.length > 0) {
      const selectedFileSize = result.assets[0].fileSize; // Size in bytes

      // 5MB (5 * 1024 * 1024 bytes)
      const maxSizeInBytes = VideoSize * 1024 * 1024;
      const allowedFormats = VideoFarmats;

      const selectedFileType = result.assets[0].type;

      if (allowedFormats.includes(selectedFileType)) {
        if (selectedFileSize <= maxSizeInBytes) {
          setSelectedVideo(result.assets[0].uri);
        } else {
          alert(`Selected file size exceeds. Please choose a smaller file.${VideoSize}`)
        }
      } else {
        alert(
          `Invalid file format. Please choose a valid video format${allowedFormats}`,
        );
      }
    }
  };

  // const chooseVideo = async () => {
  //   const result = await launchImageLibrary({mediaType: 'video', quality: 1});
  //   // console.log(result)
  //   if (result.assets && result.assets.length > 0) {
  //     setSelectedVideo(result.assets[0].uri); // Use the URI of the selected image
  //     // navigation.navigate('Player')
  //     // let Image = selectedVideo
  //     // handelUpload(Image)
  //     // setIsModalV(false);
  //   }
  // };

  // const chooseVideo = async () => {
  //   const options = {
  //     mediaType: 'video',
  //     videoQuality: 'high',
  //     durationLimit: 10, // Set the maximum duration for recording
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   const res = await launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled video picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       console.log(response.assets.uri)
  //       setVideoUri(response.uri);
  //     }
  //   });
  // };

  // const handleGenerate = () => {
  //   if (inputText) {
  //     setGeneratedTexts([...generatedTexts, inputText]);
  //     setInputText('');
  //   }
  // };

  const handelUpload = async () => {
    let newfile = {
      uri: selectedVideo,
      type: 'test/mp4',
      name: 'test-unoqe-name12',
    };
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Basic e3thcGlfa2V5fX06e3thcGlfc2VjcmV0fX0=',
    );

    var formdata = new FormData();
    formdata.append('file', newfile, 'video.mp4');
    formdata.append('upload_preset', 'SnapPromise');
    formdata.append('public_id', selectedVideo);
    formdata.append('api_key', '{{199266658813937}}');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.cloudinary.com/v1_1/dpwdh9zeb/video/upload',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);

        // Extract the 'version' field from the JSON response
        const url = result.secure_url;
        setAttachMedia(url);
        setIsModalV(false);
      })
      .catch(error => console.log('error', error));
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Basic e3thcGlfa2V5fX06e3thcGlfc2VjcmV0fX0=");

    // var formdata = new FormData();
    // formdata.append("file", selectedVideo, "[PROXY]");
    // formdata.append("upload_preset", "SnapPromise");
    // formdata.append("public_id", "dpwdh9zwqeymmsqadwu");
    // formdata.append("api_key", "{{199266658813937}}");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("https://api.cloudinary.com/v1_1/dpwdh9zeb/video/upload", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  };


  const handleTextChange = (text) => {
    setGeneratedTexts(text);
    // Call the callback function with the entered text
    onTextChange && onTextChange(text);
  };

  const suggest = async ()=>{
      await axios.post(`https://snappromise.com:8080/suggestPromiseText?promiseStatement=${generatedTexts}`)
      .then((response)=>{
          console.log("this is sugesstion response", response);
          setSuggestedText(response.data.description);
      })
      .catch((error)=>{
          console.log("this is sugesstion error", error);
      })
  }

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(0.5),
          }}>
          {/* <View
            style={[
              styles.CiBox,
              {
                borderColor: makePromise ? '#EB6F1F' : '#305B61',
                borderWidth: hp(0.4),
              },
            ]}></View> */}

          <View
            style={{
              marginTop: hp(2),
              width: wp(80),
            }}>
              {
                console.log("Suggested text", suggestedText)
              }
            <TextInput
              placeholder="Write a Promise Statement"
              onChangeText={handleTextChange}
              placeholderTextColor="black"
              style={{
                width: wp(80), paddingHorizontal: wp(4), borderWidth: wp(0.6),
                borderColor: '#652D90',
                borderRadius: wp(3),
                color: '#000',
                height: hp(15), // Set the height as needed
                textAlignVertical: 'top',

              }}
              multiline={true}
              value={suggestedText ? {...suggestedText} : generatedTexts}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => setIsModalV(true)} style={{ marginTop: 10, marginStart: 10 }}>
              {!attachMedia ? (
                <Ionicons color="#652D90" name="videocam" size={30} />
              ) : (
                <Ionicons color="red" name="videocam" size={30} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={suggest} style={{ marginTop: 30, marginStart: 10 }}>
              {!attachMedia ? (
                <Ionicons color="#652D90" name="flash-outline" size={30} />
              ) : (
                <Ionicons color="red" name="flash" size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalV}
          onRequestClose={() => setIsModalV(false)}>
          <TouchableWithoutFeedback onPress={() => setIsModalV(false)}>
            <View style={{ flex: 1 }}>
              <BlurView blurType="light" blurAmount={10} style={{ flex: 1 }}></BlurView>

              <View
                style={{
                  borderWidth: 0.5,
                  width: wp(95),
                  alignSelf: 'center',
                  borderRadius: wp(4),
                  borderColor: '#652D90',
                  marginHorizontal: wp(3),
                  height: hp(18),
                  marginTop: hp(0),
                  backgroundColor: 'white',
                }}>
                <View style={{ marginTop: hp(1), marginHorizontal: 30 }}>
                  <View style={{ width: wp(100) }}>
                    {selectedVideo ? (
                      <Video
                        ref={ref}
                        source={{ uri: selectedVideo }}
                        style={styles.halfScreen}
                        resizeMode="contain"
                        muted={true}
                      />
                    ) : null}
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginHorizontal: wp(8),
                      marginVertical: hp(3.5),
                    }}>
                    <TouchableOpacity onPress={openCamera} style={{ color: '#000' }}>
                      <Mater color="#652D90" name="camera" size={40} />
                      <View>
                        <Text style={{ color: '#000', marginLeft: wp(-4) }}>Capture Now</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={chooseVideo} style={{}}>
                      <Mater color="#652D90" name="image-size-select-actual" size={40} />
                      <View>
                        <Text style={{ color: '#000', marginLeft: wp(-4) }}>Select Media</Text>
                      </View>
                    </TouchableOpacity>
                    {selectedVideo && (
                      <TouchableOpacity onPress={handelUpload} style={{}}>
                        <MaterialIcons color="#652D90" name="done" size={40} />
                      </TouchableOpacity>
                    )}
                    {selectedVideo && (
                      <TouchableOpacity onPress={() => setSelectedVideo(null)} style={{}}>
                        <Mater color="#652D90" name="selection-remove" size={40} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              <BlurView blurType="light" blurAmount={10} style={{ flex: 1 }}></BlurView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* <TouchableOpacity onPress={handleGenerate} style={styles.genrateBtn}>
          <View>
            <Text style={Headings.Input5}>Generate</Text>
          </View>
          <View>
            <Ionicons
              name="return-up-back-outline"
              size={20}
              color="#652D90"
              style={{marginVertical: hp(0)}}
            />
            <Ionicons
              name="return-down-forward-outline"
              size={20}
              color="#F6921E"
              style={{marginVertical: hp(0)}}
            />
          </View>
        </TouchableOpacity> */}
      </View>
      {/* Promises */}
      <View style={styles.generatedBox}>
        {/* <ScrollView>
          {generatedTexts.map((text, index) => (
            <View key={index} style={styles.generatedTextBox}>
              <Text style={styles.generatedText}>{text}</Text>
            </View>
          ))}
        </ScrollView> */}
        {/* <Text> {generatedTexts} </Text> */}
      </View>
    </View>
  );
};

export default PromiseStatement;

const styles = StyleSheet.create({
  CiBox: {
    backgroundColor: 'grey',
    width: wp(13),
    height: hp(6),
    borderRadius: wp(13),
    position: 'absolute',
    left: 0,
    marginTop: wp(0.5),
    borderWidth: 1,
  },
  halfScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: wp(100),
    height: hp(40),
  },
  fullScreen: {
    width: '100%',
    height: hp(43),
    backgroundColor: 'black',
  },
  logoImageContainer: {
    // width: '100%',
    // height: '100%',
    borderRadius: hp(50),
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  logoImage: {
    width: wp(100),
    height: '100%',
  },
  genrateBtn: {
    backgroundColor: '#F6E2FF',
    width: wp(30),
    borderRadius: hp(10),
    height: hp(4),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: wp(4),
    top: hp(6.5),
  },
  generatedBox: {
    width: '100%',
    borderColor: 'gray',
    height: hp(8),
    marginTop: hp(2),

    // borderWidth: wp(1)
  },
  generatedTextBox: {
    padding: hp(0.4),
  },
  generatedText: {
    fontSize: hp(1.5),
  },
});

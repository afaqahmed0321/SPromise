// import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mater from 'react-native-vector-icons/MaterialCommunityIcons';

import { useRecoilState } from 'recoil';
import {
  promiseStatement,
  MakeaPromise,
  selectedMedia,
  selectMedia,
} from '../../recoil/AddPromise';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
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
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectMedia);
  const [attachMedia, setAttachMedia] = useRecoilState(selectedMedia);
  const [videoUri, setVideoUri] = useState(null);

  const [licked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0 });
  const [VideoFarmats, setVideoFarmats] = useRecoilState(
    AllowedVideoFormatsState,
  );
  const [VideoSize, setVideoSize] = useRecoilState(AllowedVideoSizeState);

  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();



  const openCamera = async () => {
    setIsModalV(false)
    const result = await launchCamera({ mediaType: 'video', quality: 1 });

    if (result.assets && result.assets.length > 0) {
      const selectedFileSize = result.assets[0].fileSize; // Size in bytes
      const maxSizeInBytes = 20 * 1024 * 1024;
      const allowedFormats = [".mp4", ".mov", ".wmv", ".qt"];
      const selectedFileType = result.assets[0].type;
      if (selectedFileSize <= maxSizeInBytes) {
        setSelectedVideo(result.assets[0].uri);
      }
      else {
        alert(
          `Invalid file format. Please choose a valid video format${allowedFormats}`,
        );
      }
    }
  }
  const chooseVideo = async () => {
    setIsModalV(false)
    const result = await launchImageLibrary({ mediaType: 'video', quality: 1 });

    if (result.assets && result.assets.length > 0) {
      const selectedFileSize = result.assets[0].fileSize; // Size in bytes
      const maxSizeInBytes = 20 * 1024 * 1024; // Convert MB to bytes
      const allowedFormats = VideoFarmats; // Check allowed formats
      const selectedFileType = result.assets[0].type;
      console.log("Selected file size:", selectedFileSize);
      console.log("Max allowed size:", maxSizeInBytes);
      console.log("Selected file type:", selectedFileType);

      if (selectedFileSize <= maxSizeInBytes) {
        setSelectedVideo(result.assets[0].uri);
      } else {
        alert(`Selected file size exceeds. Please choose a smaller file.`);
      }
    }
  };

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

        const url = result.secure_url;
        setAttachMedia(url);
        setIsModalV(false);
      })
      .catch(error => console.log('error', error));
  };


  const handleTextChange = (text) => {
    setGeneratedTexts(text);
    onTextChange && onTextChange(text);
  };

  const suggest = async () => {
    await axios.post(`https://snappromise.com:8080/suggestPromiseText?promiseStatement=${generatedTexts}`)
      .then((response) => {
        console.log("this is sugesstion response", response);
        setGeneratedTexts(response.data.description);
      })
      .catch((error) => {
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
          <View
            style={{
              marginTop: hp(2),
              width: wp(80),
            }}>
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
                paddingBottom: 10,
              }}
              multiline={true}
              value={generatedTexts}
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

              <Ionicons color="#652D90" name="flash-outline" size={30} />

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

                  </View>
                </View>
              </View>

              <BlurView blurType="light" blurAmount={10} style={{ flex: 1 }}></BlurView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
      <View style={styles.generatedBox}>

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

  },
  generatedTextBox: {
    padding: hp(0.4),
  },
  generatedText: {
    fontSize: hp(1.5),
  },
});

import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { getFileSize } from './utils';

const CameraScreen = ({ navigation, route }) => {

  useEffect(() => {
    const openCamera = async () => {
      const options = {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 60,
      };

      try {
        const result = await launchCamera(options);
        console.log('Camera result:', result);

        if (result.didCancel) {
          console.log('User cancelled video recording');
          navigation.goBack();
        } else if (result.errorCode) {
          console.error('Error code:', result.errorCode);
          console.error('Error message:', result.errorMessage);
          Alert.alert('Error', `There was an error recording the video: ${result.errorMessage}`);
        } else if (result.assets && result.assets[0].uri) {
          const videoUri = result.assets[0].uri;
          console.log('Video URI:', videoUri);

          const fileSize = await getFileSize(videoUri);
          console.log('Video File Size:', fileSize);

          if (route.params.onVideoRecorded) {
            route.params.onVideoRecorded({ uri: videoUri, fileSize });
          }
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error opening camera:', error);
        Alert.alert('Error', 'There was an error opening the camera.');
        navigation.goBack();
      }
    };

    openCamera();
  }, [navigation, route]);

  return <View style={{ flex: 1, backgroundColor: 'black' }} />;
};

export default CameraScreen;

import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const CameraScreen = ({ navigation, route }) => {

  const getFileSize = async (uri) => {
    try {
      const stats = await RNFS.stat(uri);
      return stats.size;
    } catch (error) {
      console.error('Error getting file size:', error);
      return 0;
    }
  };

  useEffect(() => {
    const openCamera = async () => {
      try {
        const video = await ImagePicker.openCamera({
          mediaType: 'video',
          compressVideoPreset: 'HighestQuality',
          durationLimit: 60, // Limit the duration of the video to 60 seconds
        });

        console.log('Video result:', video);

        if (!video || !video.path) {
          console.log('User cancelled video recording');
          navigation.goBack();
          return;
        }

        const videoUri = video.path;
        console.log('Video URI:', videoUri);

        const fileSize = await getFileSize(videoUri);
        console.log('Video File Size:', fileSize);

        if (route.params.onVideoRecorded) {
          route.params.onVideoRecorded({ uri: videoUri, fileSize });
        }
        navigation.goBack();
      } catch (error) {
        console.error('Error opening camera:', error);
        Alert.alert('Error', 'There was an error recording the video.');
        navigation.goBack();
      }
    };

    openCamera();
  }, [navigation, route]);

  return <View style={{ flex: 1, backgroundColor: 'black' }} />;
};

export default CameraScreen;

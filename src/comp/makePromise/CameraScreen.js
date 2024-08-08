import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { getFileSize } from './utils'; // Import the utility function

const CameraScreen = ({ navigation, route }) => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current) {
      const options = {
        quality: RNCamera.Constants.VideoQuality['720p'],
        mediaType: 'video',
        maxDuration: 60, // Optional: limit the duration of the video
      };
      setIsRecording(true);
      try {
        const videoData = await cameraRef.current.recordAsync(options);
        console.log('Video data:', videoData);

        // Ensure video file size is checked in a separate step
        const fileSize = await getFileSize(videoData.uri); // Use a utility to check file size

        if (route.params.onVideoRecorded) {
          route.params.onVideoRecorded({ uri: videoData.uri, fileSize });
        }
        navigation.goBack();
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'There was an error recording the video.');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      try {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
        Alert.alert('Error', 'There was an error stopping the recording.');
        setIsRecording(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      />
      <View style={styles.recordButtonContainer}>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording} style={styles.capture}>
            <Text style={styles.captureText}>STOP</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording} style={styles.capture}>
            <Text style={styles.captureText}>RECORD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recordButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
});

export default CameraScreen;

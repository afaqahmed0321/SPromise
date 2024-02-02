// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Platform, ToastAndroid } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { AllowedVideoFormatsState, AllowedVideoSizeState } from '../../recoil/Globel';

// const VideoSel = () => {
//   const [videoUri, setVideoUri] = useState(null);
//   const [VideoFarmats, setVideoFarmats] = useRecoilState(AllowedVideoFormatsState);
//   const [VideoSize, setVideoSize] = useRecoilState(AllowedVideoSizeState);



//   const chooseVideo = async () => {
//     const options = {
//       mediaType: 'video',
//       videoQuality: 'high',
//       durationLimit: 10, // Set the maximum duration for recording
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     const res = await launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const allowedFormats = VideoFarmats;
//         const maxFileSize = VideoSize * 1024 * 1024; // 5 MB in bytes

//         const fileExtension = response.uri.split('.').pop();
//         const fileSize = response.fileSize || response.fileSize;

//         if (!allowedFormats.includes(`.${fileExtension}`)) {
//           console.log('Invalid video format');
//           // Display a toast for Android
//           if (Platform.OS === 'android') {
//             ToastAndroid.showWithGravity(
//               'Invalid video format. Please choose a valid video.',
//               ToastAndroid.LONG,
//               ToastAndroid.CENTER
//             );
//           }
//         } else if (fileSize > maxFileSize) {
//           console.log('Video size exceeds the limit');
         
//           if (Platform.OS === 'android') {
//             ToastAndroid.showWithGravity(
//               'Video size should not exceed 5 MB.',
//               ToastAndroid.LONG,
//               ToastAndroid.CENTER
//             );
//           }
//         } else {
//           setVideoUri(response.uri);
//         }
//       }
//     });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {videoUri && (
//         <View>
//           <Text>Selected Video:</Text>
//           <Image source={{ uri: videoUri }} style={{ width: 300, height: 300 }} />
//         </View>
//       )}

//       <TouchableOpacity onPress={chooseVideo}>
//         <Text>Choose Video from Gallery</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VideoSel;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
// // import ImagePicker from 'react-native-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const VideoSel = () => {
//   const [videoUri, setVideoUri] = useState(null);

//   const chooseVideo = async () => {
//     const options = {
//       mediaType: 'video',
//       videoQuality: 'high',
//       durationLimit: 10, // Set the maximum duration for recording
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     const res = await launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         setVideoUri(response.uri);
//       }
//     });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {videoUri && (
//         <View>
//           <Text>Selected Video:</Text>
//           <Image source={{ uri: videoUri }} style={{ width: 300, height: 300 }} />
//         </View>
//       )}

//       <TouchableOpacity onPress={chooseVideo}>
//         <Text>Choose Video from Gallery</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VideoSel;

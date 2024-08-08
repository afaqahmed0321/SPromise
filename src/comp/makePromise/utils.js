import { Platform, NativeModules } from 'react-native';
import RNFS from 'react-native-fs';

export const getFileSize = async (uri) => {
  try {
    if (Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        RNFS.stat(uri)
          .then(stats => resolve(stats.size))
          .catch(err => reject(err));
      });
    } else {
      // iOS does not support direct file size retrieval in the same way
      return new Promise((resolve, reject) => {
        RNFS.stat(uri)
          .then(stats => resolve(stats.size))
          .catch(err => reject(err));
      });
    }
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const getFileSize = async (uri) => {
  try {
    const stats = await RNFS.stat(uri);
    return stats.size;
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

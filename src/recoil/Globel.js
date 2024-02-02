import {atom} from 'recoil';

export const ismodalVisible = atom({
  key: 'ismodalVisible',
  default: false,
});

export const refreshPromiseNetwork = atom({
  key: 'refreshPromiseNetwork',
  default: false,
});
export const AllowedVideoFormatsState = atom({
  key: 'AllowedVideoFormatsState',
  default: [],
});
export const AllowedVideoSizeState = atom({
  key: 'AllowedVideoSizeState',
  default: "",
});
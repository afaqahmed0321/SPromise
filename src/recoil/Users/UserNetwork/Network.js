import {atom} from 'recoil';



export const selectedNetworkUser = atom({
  key: 'selectedNetworkUser',
  default: "",
});
export const selectedNetworkUserFeed = atom({
  key: 'selectedNetworkUserFeed',
  default: [],
});
export const IspromiseNetworkmodalVisible = atom({
  key: 'IspromiseNetworkmodalVisible',
  default: false,
});

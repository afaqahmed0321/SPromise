/* The code is importing the `atom` function from the `recoil` library and using it to create two
Recoil atoms: `DetailsModalVi` and `Notification`. */
import {atom} from 'recoil';

export const DetailsModalVi = atom({
  key: 'DetailsModalVi',
  default: false,
});

//

export const NotificationData = atom({
  key: 'NotificationData',
  default: {},
});

export const docNo = atom({
  key: 'docNo',
  default: '',
});

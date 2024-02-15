import {atom} from 'recoil';

export const code = atom({
  key: 'code',
  default: '',
});

export const uemail = atom({
    key: 'email',
    default: '',
  });
  export const upassword = atom({
    key: 'password',
    default: '',
  });
  export const ufName = atom({
    key: 'fName',
    default: '',
  });
  export const ulName = atom({
    key: 'lName',
    default: '',
  });
  export const userData = atom({
    key: 'userData',
    default: '',
  });
  export const isChangePasswordModalV = atom({
    key: 'isChangePasswordModalV',
    default: false,
  });
  export const CurrentPassword = atom({
    key: 'CurrentPassword',
    default: "",
  });
  export const isDOBModalV = atom({
    key: 'isDOBModalV',
    default: "",
  });
  export const DobDate = atom({
    key: 'DobDate',
    default: "",
  });
  export const RemoveSoicalLinkApprovalState = atom({
    key: 'RemoveSoicalLinkApprovalState',
    default: false,
  });
  export const RemoveTwitterApicall = atom({
    key: 'RemoveTwitterApicall',
    default: false,
  });

  
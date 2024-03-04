

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com'
  });

export default async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user)=>{
      console.log(user,"user");
    })
    .catch((error)=>{
      console.log(error)
    })
  }
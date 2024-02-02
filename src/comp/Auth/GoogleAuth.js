

import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: '297781393287-082ioneo7rm34l59ia7qd027vspk82vd.apps.googleusercontent.com'
  });
  

export default async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user)=>{
      console.log(user,"user");
    })
    .catch((error)=>{
      console.log(error)
    })
  }
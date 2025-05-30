import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig'; // ✅ use existing initialized auth
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URI = `https://auth.expo.io/@snowy_hedgedog/Forq`;

console.log("Redirect URI:", REDIRECT_URI);

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '875902549515-7ttu26lu0a23ksu0qqjh2qr18tk6beu5.apps.googleusercontent.com',
    iosClientId: '875902549515-l8n16p4p9fu11ma4kv6uccsadt7gmik7.apps.googleusercontent.com',
    redirectUri: REDIRECT_URI,
  });

  //handle login
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
  
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Login success:", userCredential);
          alert('Logged in with Google!');
        })
        .catch((error) => {
          console.error("Firebase login error:", error.message, error.code);
          alert("Login error: " + error.message);
        });
    }
  }, [response]);
  

  return { promptAsync, request };
}

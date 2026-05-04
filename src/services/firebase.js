import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBv49AaZ4Os_AFg-p6-0mQ2_o854HvDoCg",
  authDomain: "summify-ff9e1.firebaseapp.com",
  projectId: "summify-ff9e1",
  storageBucket: "summify-ff9e1.firebasestorage.app",
  messagingSenderId: "1080640452390",
  appId: "1:1080640452390:web:195cc7e41b45f0b8e873e7"
};

const app        = initializeApp(firebaseConfig);
const auth       = getAuth(app);
const analytics  = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, analytics, googleProvider };
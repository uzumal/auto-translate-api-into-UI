import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported } from "@firebase/analytics";
import { Auth, getAuth, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXi29_4UrmrnmBuT3vSjCkxzvc8d4_TYc",
  authDomain: "api-translator-e11f5.firebaseapp.com",
  projectId: "api-translator-e11f5",
  storageBucket: "api-translator-e11f5.appspot.com",
  messagingSenderId: "305462065117",
  appId: "1:305462065117:web:af6b01ef706896f8dd6834",
  measurementId: "G-456Q1991M9",
};

let firebaseApp: FirebaseApp;
let auth: Auth;

if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth();
}

isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics();
    // Rest of your analytics code
  }
});

export const logout = () => {
  return signOut(auth);
};

export { firebaseApp, auth };

export const authPromise = new Promise<Auth>((resolve, reject) => {
  if (auth) {
    resolve(auth);
  } else {
    const intervalId = setInterval(() => {
      if (auth) {
        clearInterval(intervalId);
        resolve(auth);
      }
    }, 1000); // 1秒ごとにチェック
  }
});

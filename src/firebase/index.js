import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTKGkj7keGOOlEz2gBfWhdYhkTlspaYKc",
  authDomain: "healthie-2d288.firebaseapp.com",
  projectId: "healthie-2d288",
  storageBucket: "healthie-2d288.appspot.com",
  messagingSenderId: "169320815311",
  appId: "1:169320815311:web:306e33fb6494a6f94eb5ba",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };

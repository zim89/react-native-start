import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAoBtG_JsGduGwO4pGayU_3_gNgjHj2CFw',
  authDomain: 'react-native-start-398406.firebaseapp.com',
  databaseURL: 'https://react-native-start-398406-default-rtdb.europe-west3.firebasedatabase.app',
  projectId: 'react-native-start-398406',
  storageBucket: 'react-native-start-398406.appspot.com',
  messagingSenderId: '719682780486',
  appId: '1:719682780486:ios:d7deb99892cf9fbb0cf947',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

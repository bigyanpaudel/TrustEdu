import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

var config = {
  apiKey: "AIzaSyDRXhoz1kOPGN1v3Tabi_rsJCRAuLRZ68A",
  authDomain: "trustedu-cc4c4.firebaseapp.com",
  projectId: "trustedu-cc4c4",
  storageBucket: "trustedu-cc4c4.firebasestorage.app",
  messagingSenderId: "839306143526",
  appId: "1:839306143526:web:3e9812072c154a28c903e7",
  measurementId: "G-WDFKWEKTLH"
};

const app = initializeApp(config);
const auth = getAuth(app);

export { auth };
export default app;
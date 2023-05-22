// Import the functions you need from the SDKs you need
import { deleteApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket:import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MSGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

// Initialize Firebase

let firebaseApp;
if(!getApps().length){
    firebaseApp=initializeApp(firebaseConfig)
}else{
    firebaseApp=getApps()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

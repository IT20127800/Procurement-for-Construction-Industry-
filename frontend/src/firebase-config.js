import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfOXdbdQdqpNl60iyWYMX2udqw7fAP2bc",
    authDomain: "construction-industry-b8020.firebaseapp.com",
    projectId: "construction-industry-b8020",
    storageBucket: "construction-industry-b8020.appspot.com",
    messagingSenderId: "350882100092",
    appId: "1:350882100092:web:29c46c576e9425d283eaf9",
    measurementId: "G-KN8Z34H04V"
  };

  const app = initializeApp(firebaseConfig);

 export const db=getFirestore(app);
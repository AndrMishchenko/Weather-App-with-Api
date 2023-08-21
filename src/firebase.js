import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDj4VvKos-uz8YEvhc8KFi3c7n4HB1Xthc",
  authDomain: "auth-test-c8d5e.firebaseapp.com",
  projectId: "auth-test-c8d5e",
  storageBucket: "auth-test-c8d5e.appspot.com",
  messagingSenderId: "844757902795",
  appId: "1:844757902795:web:503fac96a050d8c31a424e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
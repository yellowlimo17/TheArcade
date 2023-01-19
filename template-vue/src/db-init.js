import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyARbDbwYcXPgNxULgS-0HrlYt2kfdxWMnk",
    authDomain: "arcade-1e9b4.firebaseapp.com",
    databaseURL: "https://arcade-1e9b4.firebaseio.com",
    projectId: "arcade-1e9b4",
    storageBucket: "arcade-1e9b4.appspot.com",
    messagingSenderId: "93706596933",
    appId: "1:93706596933:web:1403e852f49b367ca2a92c",
    measurementId: "G-PT47DF1YXR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
const AppAUTH = firebase.auth();
export { AppDB, AppAUTH }; // Make it available to other modules
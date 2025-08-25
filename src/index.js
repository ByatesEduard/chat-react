import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCZPSXt8oE1L0zzL7HMas234Be0lnUAbpg",
  authDomain: "chatapp-b77bb.firebaseapp.com",
  projectId: "chatapp-b77bb",
  storageBucket: "chatapp-b77bb.appspot.com",
  messagingSenderId: "1008768820995",
  appId: "1:1008768820995:web:de7dc1d7c4d051a1f5eb36",
  measurementId: "G-CDWD92HZSN",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const firestore = getFirestore(app);


export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ app, auth, firestore }}>
    <App />
  </Context.Provider>
);

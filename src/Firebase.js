import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCrvobNUC9_uBeu8CxVTW2nn-RSvvhqjWo",
  authDomain: "citas-f171e.firebaseapp.com",
  databaseURL: "https://citas-f171e.firebaseio.com",
  projectId: "citas-f171e",
  storageBucket: "citas-f171e.appspot.com",
  messagingSenderId: "489976685990",
  appId: "1:489976685990:web:03f9e6973148db2888db67",
  measurementId: "G-SZB9TSRN93"
};
const firebaseConf = firebase.initializeApp(config);
export default firebaseConf;

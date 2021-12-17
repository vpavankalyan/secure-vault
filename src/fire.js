
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "---",
  authDomain: "---",
  projectId: "---",
  databaseURL:"---",
  storageBucket: "---",
  messagingSenderId: "---",
  appId: "---",
  measurementId: "---"
};

const fire = initializeApp(firebaseConfig);
const analytics = getAnalytics(fire);

export default fire;
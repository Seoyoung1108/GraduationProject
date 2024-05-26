import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  vapidKey,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "./keys/keys";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting User Permission ----");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted");

      return getToken(messaging, {
        vapidKey: vapidKey,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
            localStorage.setItem("token", currentToken);
          } else {
            console.log("fail");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      console.log("User Permission Denied");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

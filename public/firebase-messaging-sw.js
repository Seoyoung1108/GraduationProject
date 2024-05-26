import { apiKey, projectId, messagingSenderId, appId } from "./keys/keys";

importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const config = {
  apiKey: apiKey,
  projectId: projectId,
  messagingSenderId: messagingSenderId,
  appId: appId,
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

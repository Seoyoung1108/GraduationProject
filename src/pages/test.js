import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import { vapidKey } from "../keys/keys";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Test = () => {
  /*
  function test() {
    fetch("https://fcm.googleapis.com/v1/projects/jolvre-cdfe2/messages:send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapidKey}`,
      },
      body: JSON.stringify({
        message: {
          token: token,
          notification: {
            body: "This is an FCM notification message!",
            title: "FCM Message",
          },
        },
      }),
    })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
      });
  }
  */

  const clientId =
    "860691160146-n8e8qvksfbop58pnb18aahi90t3e3ppo.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
      <div>
        <Notification />
        <button>버튼</button>
      </div>
    </>
  );
  /*
  return (
    
  );*/
};

export default Test;

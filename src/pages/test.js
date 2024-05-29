/*
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Notification from "../components/Notification";
import { vapidKey } from "../keys/keys";

const Test = () => {
  // Import the functions you need from the SDKs you need

  const token = localStorage.getItem("token");

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

  return (
    <div>
      <Notification />
      <button onClick={test}>버튼</button>
      <Helmet>
        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        ></script>
      </Helmet>
      <model-viewer
        src="/model/8036ce28-c767-45bc-84ff-9a7fc7523e93.glb"
        shadow-intensity="1"
        ar
        camera-controls
        touch-action="pan-y"
      ></model-viewer>
    </div>
  );
};

export default Test;
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    </div>
  );
};

export default Test;

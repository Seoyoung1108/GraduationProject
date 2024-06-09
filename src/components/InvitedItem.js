import React, { useState } from "react";
import "./InvitedItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const InvitedItem = ({ invitations }) => {
  const accessToken = localStorage.getItem("accessToken");

  const id = invitations.id;
  const name = invitations.groupName;
  const state = invitations.inviteState;

  function onClickAccept(e) {
    fetch(`/api/v1/group/invite/user/${id}/ACCEPT`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        inviteId: id,
        inviteState: "ACCEPT",
      }),
    })
      .then((response) => {
        alert(name + " 전시관의 멤버가 되었습니다.");
        document.location.href = "/mypage/mygroup";
      })
      .catch((error) => {
        console.log(error.response);
      });

    e.preventDefault();
  }

  function onClickRefuse(e) {
    fetch(`/api/v1/group/invite/user/${id}/REFUSE`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        inviteId: id,
        inviteState: "REFUSE",
      }),
    })
      .then((response) => {
        document.location.href = "/mypage/mygroup";
      })
      .catch((error) => {
        console.log(error.response);
      });

    e.preventDefault();
  }

  return (
    <li className="InvitedItem" style={{ zIndex: 50 }}>
      <div className="name">{name}</div>
      <div className="buttons">
        <button
          className="state"
          style={{ backgroundColor: "#610b0b" }}
          onClick={onClickAccept}
        >
          수락하기
        </button>
        <button
          className="state"
          style={{ backgroundColor: "#6e6e6e" }}
          onClick={onClickRefuse}
        >
          거절하기
        </button>
      </div>
    </li>
  );
};
export default InvitedItem;

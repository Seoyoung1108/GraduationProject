import React, { useState } from "react";
import "./SubArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const InvitedItem = ({ invitations }) => {
  const id = invitations.id;
  const name = invitations.groupName;
  const state = invitations.inviteState;

  return (
    <li className="SubArtItem" style={{ zIndex: 50 }}>
      <div className="name">{name}</div>
      {(() => {
        if (state === "PEND") {
          return (
            <>
              <button>수락하기</button>
              <button>거절하기</button>
            </>
          );
        }
      })()}
    </li>
  );
};
export default InvitedItem;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InvitedItem from "../components/InvitedItem";
import "./MyProject.scss";
import axios from "axios";

const MyGroupInvited = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [invitations, setInvitations] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/group/invite/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInvitations(response.data.inviteResponses);
      });
  }, []);

  return (
    <div className="Diary">
      <div className="MyProject">
        <div className="Title">
          <div className="Letter">
            <h2>초대받은 단체 전시관 목록입니다.</h2>
          </div>
        </div>
        <div className="Line"></div>
        <ul className="ArtList">
          {invitations &&
            invitations.map((invitations) => (
              <InvitedItem invitations={invitations} key={invitations.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MyGroupInvited;

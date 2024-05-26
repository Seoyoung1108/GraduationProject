import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BulletinItem.scss";

const CommunityItem = ({ posts }) => {
  const postId = posts.postId;
  const title = posts.title;
  const userName = posts.userName;
  const createdDate = posts.createdDate;

  return (
    <Link style={{ textDecoration: "none" }} to={`/community/${postId}`}>
      <div className="BulletinItem" style={{ zIndex: 50 }}>
        <div className="info4">{title}</div>
        <div className="info5">{userName}</div>
        <div className="info3">{createdDate.substring(0, 10)}</div>
      </div>
    </Link>
  );
};

export default CommunityItem;

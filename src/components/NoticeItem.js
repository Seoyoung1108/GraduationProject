import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NoticeItem.scss";

const NoticeItem = ({ notices }) => {
  const id = notices.id;
  const date = notices.date;
  const content = notices.content;

  return (
    <div className="NoticeItem" style={{ zIndex: 50 }}>
      <div className="Date">{date}</div>
      <div className="Contents">{content}</div>
    </div>
  );
};

export default NoticeItem;

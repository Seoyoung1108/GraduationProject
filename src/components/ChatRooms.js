import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ChatRooms.scss";

const ChatRooms = ({ chatRoom, onClick }) => {
  const roomId = chatRoom.roomId;
  const receiverNickname = chatRoom.receiverNickname;
  const profileImg = chatRoom.receiverProfileImg;
  const lastChatMsg = chatRoom.lastMsgContent;
  const lastChatDate = chatRoom.lastMsgDate;

  // Date 객체로 파싱
  const date = new Date(lastChatDate);

  // 포맷팅을 위한 함수들
  const pad = (num) => num.toString().padStart(2, "0");

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(2);
    const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 +1
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMonth());
    const seconds = pad(date.getDay());

    return `${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <div className="ChatItem" style={{ zIndex: 50 }} onClick={onClick}>
      <div className="ProfileImg">
        <img src={profileImg}></img>
      </div>
      <div className="Content">
        <div className="Nickname">{receiverNickname}</div>
        <div className="Msg">{lastChatMsg}</div>
      </div>
      <div className="Date">{formatDate(date)}</div>
    </div>
  );
};

export default ChatRooms;

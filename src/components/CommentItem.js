import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BulletinItem.scss";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";

const CommentItem = ({ comments }) => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");

  const commentId = comments.commentId;
  const content = comments.content;
  const userName = comments.userName;
  const createdDate = comments.createdDate;

  function onClickCommentDelete(e) {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`/api/v1/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          alert("댓글이 삭제되었습니다.");
          window.location.reload();
        })
        .catch((error) => {});
    } else {
    }
    e.preventDefault();
  }

  return (
    <div className="CommentItem" style={{ zIndex: 50 }}>
      <div className="info1">
        <div className="info1_1">{userName}</div>
        <div className="info1_2">
          {(() => {
            if (myNickName === userName) {
              return (
                <button className="Back" onClick={onClickCommentDelete}>
                  <RiDeleteBin5Line />
                </button>
              );
            }
          })()}
        </div>
      </div>
      <div className="info2">{content}</div>
      <div className="info3">
        {createdDate.substring(0, 10) + " " + createdDate.substring(11, 16)}
      </div>
    </div>
  );
};

export default CommentItem;

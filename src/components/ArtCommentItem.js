import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./BulletinItem.scss";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";

const ArtCommentItem = ({ comments }) => {
  const accessToken = localStorage.getItem("accessToken");

  const myNickName = localStorage.getItem("myNickName");
  const { exhibitId } = useParams();

  const commentId = comments.commentId;
  const content = comments.content;
  const userName = comments.userInfo.nickname;

  function onClickCommentDelete(e) {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios
        .delete(`/api/v1/exhibit/${exhibitId}/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          alert("리뷰가 삭제되었습니다.");
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
    </div>
  );
};

export default ArtCommentItem;

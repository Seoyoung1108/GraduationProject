import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./PerBulletin.scss";
import CommentItem from "../components/CommentItem";
import { IoSend } from "react-icons/io5";

const PerCommunity = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { postId } = useParams();
  const myNickName = localStorage.getItem("myNickName");

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputCategory, setInputCategory] = useState("자유게시판");
  const [inputUserName, setInputUserName] = useState("");
  const [view, setView] = useState("");
  const [inputCreatedDate, setInputCreatedDate] = useState("");
  const [inputLastModifiedDate, setInputLastModifiedDate] = useState("");
  const [images, setImages] = useState(null);
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState(null);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  const saveInputComment = (e) => {
    setInputComment(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/post/into/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputTitle(response.data.title);
        setInputContent(response.data.content);
        setInputUserName(response.data.userName);
        setView(response.data.view);
        setInputCreatedDate(response.data.createdDate);
        setInputLastModifiedDate(response.data.last_modified_date);
        setImages(response.data.imagesUrl);
        if (response.data.category === "QUESTION") {
          setInputCategory("질문게시판");
        }
      });

    axios
      .get(`/api/v1/comment/getComment/${postId}?page=1&size=10`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setComments(response.data.content);
      });
  }, []);

  if (!comments) {
    return null;
  }

  const onClick = () => {
    document.location.href = "/community";
  };

  function onClickDelete(e) {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      // 확인 시
      axios
        .delete(`/api/v1/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          document.location.href = "/community";
          alert("게시글이 삭제되었습니다.");
        })
        .catch((error) => {});
    } else {
    }
    e.preventDefault();
  }

  function onClickCommentUpload(e) {
    fetch(`/api/v1/comment/${postId}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content: inputComment,
      }),
    })
      .then((response) => {
        setInputComment("");
      })
      .catch((error) => {
        console.log(error.response);
      });
    //e.preventDefault();
  }

  function onClickPage(e) {
    const page = e.target.value;
    fetch(`/api/v1/comment/getComment/${postId}?page=${page}&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setComments(response.content);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="PerDiary">
      <div className="PerBulletin">
        <div className="SubTitle">{inputCategory}</div>
        <div className="Title">
          <div className="RealTitle">{inputTitle}</div>
          <div className="Date">
            조회수: {view} &nbsp; &nbsp; 작성자: {inputUserName} &nbsp; &nbsp;
            {inputCreatedDate.substring(0, 10) +
              " " +
              inputCreatedDate.substring(11, 16)}
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <div>{inputContent}</div>
          {images &&
            images.map((image) => <img className="images" src={image} />)}
        </div>
        <div className="Line"></div>
        <div className="Foot">
          {(() => {
            if (myNickName === inputUserName) {
              return (
                <>
                  <Link to={`/community/${postId}/update`}>
                    <button
                      className="Back"
                      style={{ backgroundColor: "#bf9e27" }}
                    >
                      수정
                    </button>
                  </Link>
                  <button
                    className="Back"
                    onClick={onClickDelete}
                    style={{ backgroundColor: "#610b0b" }}
                  >
                    삭제
                  </button>
                </>
              );
            }
          })()}
          <button className="Back" onClick={onClick}>
            목록
          </button>
        </div>
        <div className="SubTitle">댓글 {comments.length}</div>
        <div className="Line" style={{ backgroundColor: "#6e6e6e" }}></div>
        <div className="SendComment">
          <form onSubmit={onClickCommentUpload}>
            <input
              type="text"
              value={inputComment}
              onChange={saveInputComment}
              placeholder="댓글을 입력하세요."
            />
            <button type="submit">
              <IoSend size={30} />
            </button>
          </form>
        </div>
        <div className="Line" style={{ backgroundColor: "#6e6e6e" }}></div>
        <div className="CommentContent">
          {comments.map((comments) => (
            <CommentItem comments={comments} key={comments.commentId} />
          ))}
        </div>
        <div className="Pages">
          {pages.map((pages) => (
            <button
              onClick={onClickPage}
              value={pages}
              pages={pages}
              key={pages}
            >
              {pages}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerCommunity;

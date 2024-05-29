import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Art.scss";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { PiWechatLogoLight } from "react-icons/pi";
import axios from "axios";
import { Helmet } from "react-helmet";
import ArtCommentItem from "../components/ArtCommentItem";
import { IoSend } from "react-icons/io5";
import { IoReload } from "react-icons/io5";

const Art = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { exhibitId } = useParams();
  const myNickName = localStorage.getItem("myNickName");

  const [inputTitle, setInputTitle] = useState("");
  const [inputIsSale, setInputIsSale] = useState("비매품");
  const [inputThumbnail, setInputThumbnail] = useState(null);
  const [inputCheck3D, setInputCheck3D] = useState(false);
  const [inputModel, setInputModel] = useState(null);
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputSchool, setInputtSchool] = useState("");
  const [inputProfile, setInputProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState(null);

  sessionStorage.setItem("artist", inputAuthor);

  const saveInputComment = (e) => {
    setInputComment(e.target.value);
  };

  function onClick(e) {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios
      .get(`/api/v1/exhibit/${exhibitId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputTitle(response.data.title);
        setInputAuthor(response.data.userInfoResponse.nickname);
        setInputtSchool(response.data.userInfoResponse.school);
        setInputProfile(response.data.userInfoResponse.imageUrl);
        setInputThumbnail(response.data.thumbnail);
        setInputCheck3D(response.data.checkVirtualSpace);
        setInputModel(response.data.image3d);
        if (response.data.forSale === true) {
          setInputIsSale("판매 중");
        }
      });

    axios
      .get(`/api/v1/exhibit/${exhibitId}/comment`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setComments(response.data.responses);
      });
  }, []);

  function onClickCommentUpload(e) {
    fetch(`/api/v1/exhibit/${exhibitId}/comment`, {
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

  // src={inputModel}src="/model/8036ce28-c767-45bc-84ff-9a7fc7523e93.glb"

  return (
    <div className="Art">
      <div className="Frame">
        <div className="TitleFrame">
          <div className="ArtName">{inputTitle}</div>
          <div className="SellStatus">{inputIsSale}</div>
        </div>
        <div className="ImageFrame">
          {(() => {
            if (inputCheck3D === true) {
              if (inputModel === null) {
                return (
                  <div className="Image">
                    <IoReload size={55} />
                    {"\u00A0"}
                    {"\u00A0"}
                    {"\u00A0"}
                    모델 생성 중입니다. 잠시만 기다려 주세요.
                  </div>
                );
              } else {
                return (
                  <div className="Image">
                    <Helmet>
                      <script
                        type="module"
                        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
                      ></script>
                    </Helmet>
                    <model-viewer
                      src="/model/8036ce28-c767-45bc-84ff-9a7fc7523e93.glb"
                      shadow-intensity="1"
                      ar
                      camera-controls
                      touch-action="pan-y"
                      orientation="180deg 270deg 130deg"
                      skybox-image="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/123_hdrmaps_com_free_4K.hdr"
                      environment-image="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/123_hdrmaps_com_free_4K.hdr"
                      style={{ width: "74vw", height: "75vh" }}
                    ></model-viewer>
                  </div>
                );
              }
            } else {
              return (
                <div className="Image">
                  <img src={inputThumbnail} />
                </div>
              );
            }
          })()}

          <nav className="Menu">
            <button className="NeedBubbler">
              {(() => {
                if (inputProfile === null) {
                  return <IoPersonCircleOutline size={46} />;
                } else {
                  return <img src={inputProfile} />;
                }
              })()}

              <div className="Bubbler">
                <div className="AuthorName">{inputAuthor}</div>
                <div className="SchoolName">{inputSchool}</div>
              </div>
            </button>
            <div className="Name">작가</div>
            <Link to={`/arts/${inputTitle}/${exhibitId}/aboutart`}>
              <div className="Icon">
                <IoInformationCircleOutline size={55} />
              </div>
            </Link>
            <div className="Name">소개</div>
            <Link to={`/arts/${inputTitle}/${exhibitId}/diary`}>
              <div className="Icon">
                <SlNotebook size={33} />
              </div>
            </Link>
            <div className="Name">일기장</div>
            <Link
              to={`/arts/${inputAuthor}/${inputTitle}/${myNickName}/chat`}
              state={{ artist: inputAuthor, name: inputTitle, me: myNickName }}
            >
              <div className="Icon">
                <PiWechatLogoLight size={35} />
              </div>
            </Link>
            <div className="Name">채팅</div>
          </nav>
        </div>
        <div className="ButtonFrame">
          {(() => {
            if (isOpen === true) {
              return (
                <button className="OpenComment" onClick={onClick}>
                  ⮝ 리뷰 닫기
                </button>
              );
            } else {
              return (
                <button className="OpenComment" onClick={onClick}>
                  ⮟ 리뷰 보기
                </button>
              );
            }
          })()}
        </div>
      </div>
      {(() => {
        if (isOpen === true) {
          return (
            <div className="CommentFrame">
              <div className="SubTitle">리뷰 {comments.length}</div>
              <div className="Line"></div>
              <div className="SendComment">
                <form onSubmit={onClickCommentUpload}>
                  <input
                    type="text"
                    value={inputComment}
                    onChange={saveInputComment}
                    placeholder="리뷰를 입력하세요."
                  />
                  <button type="submit">
                    <IoSend size={30} />
                  </button>
                </form>
              </div>
              <div
                className="Line"
                style={{ backgroundColor: "#6e6e6e" }}
              ></div>
              <div className="CommentContent">
                {comments.map((comments) => (
                  <ArtCommentItem
                    comments={comments}
                    key={comments.commentId}
                  />
                ))}
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default Art;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PerBulletin.scss";

const UploadCommunity = () => {
  const accessToken = localStorage.getItem("accessToken");

  const myNickName = localStorage.getItem("myNickName");

  const offset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset).toISOString();

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [images, setImages] = useState(null);
  const [seeImages, setSeeImages] = useState(null);
  const [inputCategory, setInputCategory] = useState("CHAT");

  const saveInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const saveInputContent = (e) => {
    setInputContent(e.target.value);
  };

  const onClick0 = () => {
    setInputCategory("CHAT");
  };
  const onClick1 = () => {
    setInputCategory("QUESTION");
  };

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      setImages(uploadFile);

      // 미리보기
      let filteredImg = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
          filteredImg.push(reader.result);
        };
        reader.readAsDataURL(e.target.files[i]);
      }
      setSeeImages(filteredImg);
    }
  };

  function onClickUpload(e) {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("title", inputTitle);
    formData.append("content", inputContent);
    formData.append("category", inputCategory);

    fetch("/api/v1/post/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => {
        document.location.href = "/community";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="PerDiary">
      <div className="PerBulletin">
        <div className="SubTitle">
          <div
            onClick={onClick0}
            style={{
              color: inputCategory === "CHAT" ? "#610b0b" : "#585858",
              fontWeight: inputCategory === "CHAT" ? "bold" : "normal",
            }}
          >
            자유게시판
          </div>
          {"\u00A0"}
          {"\u00A0"}|{"\u00A0"}
          {"\u00A0"}
          <div
            onClick={onClick1}
            style={{
              color: inputCategory === "QUESTION" ? "#610b0b" : "#585858",
              fontWeight: inputCategory === "QUESTION" ? "bold" : "normal",
            }}
          >
            질문게시판
          </div>
        </div>
        <form onSubmit={onClickUpload}>
          <div className="Title">
            <input
              className="WriteRealTitle"
              type="text"
              value={inputTitle}
              onChange={saveInputTitle}
            ></input>
            <div className="Date">
              작성자: {myNickName} &nbsp; &nbsp;
              {date.substring(0, 10) + " " + date.substring(11, 16)}
            </div>
          </div>
          <div className="Line"></div>
          <textarea
            className="WriteContent"
            value={inputContent}
            placeholder="글을 입력해주세요."
            onChange={saveInputContent}
          ></textarea>
          <div className="UploadPicture">
            {seeImages && seeImages.map((image) => <img src={image} />)}
          </div>
          <input
            type="file"
            multiple
            id="profile-upload"
            accept="image/*"
            onChange={onChangeImg}
          />
          <div className="Line"></div>
          <div className="Foot">
            <button className="submit" type="submit">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCommunity;

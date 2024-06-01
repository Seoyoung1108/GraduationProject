import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./PerBulletin.scss";

const UploadDiary = () => {
  const accessToken = localStorage.getItem("accessToken");

  const myNickName = localStorage.getItem("myNickName");

  const offset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset).toISOString();

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [file, setFile] = useState(null);
  const [seeFile, setSeeFile] = useState(null);
  const { exhibitId } = useParams();
  const { exhibitName } = useParams();

  const saveInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const saveInputContent = (e) => {
    setInputContent(e.target.value);
  };

  const onChangeFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);

      // 미리보기
      const reader = new FileReader();
      reader.onload = function (e) {
        setSeeFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onClickUpload(e) {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", inputTitle);
    formData.append("content", inputContent);

    fetch(`/api/v1/diary/${exhibitId}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        document.location.href = `/arts/${exhibitName}/${exhibitId}/diary`;
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="PerDiary">
      <div className="PerBulletin">
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
            <img className="uploadsee" src={seeFile} />
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
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

export default UploadDiary;

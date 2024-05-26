import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./PerBulletin.scss";
import axios from "axios";

const UpdateDiary = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const myNickName = localStorage.getItem("myNickName");
  const { diaryId } = useParams();
  const { exhibitId } = useParams();
  const { exhibitName } = useParams();
  const date = new Date().toISOString();
  const [prevImage, setPrevImage] = useState(null);

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [file, setFile] = useState(null);

  const saveInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const saveInputContent = (e) => {
    setInputContent(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/diary/${exhibitId}/${diaryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputTitle(response.data.title);
        setInputContent(response.data.content);
        setPrevImage(response.data.imageUrl);
      });
  }, []);

  const onChangeFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);

      // 미리보기
      const reader = new FileReader();
      reader.onload = function (e) {
        setPrevImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onClickUpdate(e) {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", inputTitle);
    formData.append("content", inputContent);

    fetch(`/api/v1/diary/user/${exhibitId}/${diaryId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        document.location.href = `/arts/${exhibitName}/${exhibitId}/diary/${diaryId}`;
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="PerDiary">
      <div className="PerBulletin">
        <form onSubmit={onClickUpdate}>
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
            onChange={saveInputContent}
          ></textarea>
          <div className="UploadPicture">
            <img className="uploadsee" src={prevImage} />
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
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDiary;

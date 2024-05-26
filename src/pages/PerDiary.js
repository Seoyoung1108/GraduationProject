import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PerBulletin.scss";
import axios from "axios";

const PerDiary = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");

  const { diaryId } = useParams();
  const { exhibitId } = useParams();
  const { exhibitName } = useParams();
  const artist = sessionStorage.getItem("artist");

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputImage, setImage] = useState(null);

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
        setInputDate(response.data.startDate);
        setImage(response.data.imageUrl);
      });
  }, []);

  const onClick = () => {
    document.location.href = `/arts/${exhibitName}/${exhibitId}/diary`;
  };

  function onClickDelete(e) {
    if (window.confirm("일기글을 삭제하시겠습니까?")) {
      // 확인 시
      axios
        .delete(`/api/v1/diary/user/${exhibitId}/${diaryId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          document.location.href = `/arts/${exhibitName}/${exhibitId}/diary`;
          alert("일기글이 삭제되었습니다.");
        })
        .catch((error) => {});
    } else {
    }
    e.preventDefault();
  }

  return (
    <div className="PerDiary">
      <div className="PerBulletin">
        <div className="SubTitle">
          {exhibitName}의 일기장 / {inputTitle}
        </div>
        <div className="Title">
          <div className="RealTitle">{inputTitle}</div>
          <div className="Date">
            {inputDate.substring(0, 10) + " " + inputDate.substring(11, 16)}
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <div>{inputContent}</div>
          <img src={inputImage} />
        </div>
        <div className="Line"></div>
        <div className="Foot">
          {(() => {
            if (myNickName === artist) {
              return (
                <>
                  <Link
                    to={`/arts/${exhibitName}/${exhibitId}/diary/${diaryId}/update`}
                    state={{ diaryId: diaryId }}
                  >
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
      </div>
    </div>
  );
};

export default PerDiary;

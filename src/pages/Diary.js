import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DiaryItem from "../components/DiaryItem";
import "./Bulletin.scss";
import axios from "axios";

const Diary = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");
  const navigate = useNavigate();

  const { exhibitId } = useParams();
  const { exhibitName } = useParams();
  const artist = sessionStorage.getItem("artist");
  const [diaries, setDiaries] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/diary/${exhibitId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setDiaries(response.data.diaryGetResponses);
      });
  }, []);

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="Diary">
      <div className="Bulletin">
        <div className="Title">
          <div className="Letter">
            <h1>{exhibitName}의 일기장</h1>
          </div>
          {(() => {
            if (myNickName === artist) {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/arts/${exhibitName}/${exhibitId}/diary/upload`}
                >
                  <div className="CreateButton">글쓰기</div>
                </Link>
              );
            }
          })()}
        </div>
        <div className="Line"></div>
        <div className="StartContent">
          <div className="info1">번호</div>
          <div className="info2">제목</div>
          <div className="info3">등록일</div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          {diaries &&
            diaries.map((diaries) => (
              <DiaryItem diaries={diaries} key={diaries.id} />
            ))}
        </div>
        <div className="Line"></div>
        <div className="Foot">
          <button className="Back" onClick={onClick}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diary;

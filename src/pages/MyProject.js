import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubArtItem from "../components/SubArtItem";
import "./MyProject.scss";
import axios from "axios";

const MyProject = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [arts, setArts] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/exhibit/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setArts(response.data.exhibitResponses);
      });
  }, []);

  return (
    <div className="Diary">
      <div className="MyProject">
        <div className="Title">
          <div className="Letter">
            <h1>내 프로젝트</h1>
          </div>
          <Link
            style={{ textDecoration: "none" }}
            to={`/mypage/myproject/upload`}
          >
            <div className="CreateButton">새로 만들기</div>
          </Link>
        </div>
        <div className="Guide">
          회화, 디자인, 조각 등 다양한 종류의 예술 작품 전시를 만들어 보세요!
        </div>
        <div className="Line"></div>
        <ul className="ArtList">
          {arts &&
            arts.map((arts) => (
              <Link
                to={`/mypage/myproject/${arts.id}`}
                style={{ textDecoration: "none" }}
              >
                <SubArtItem arts={arts} key={arts.id} />
              </Link>
            ))}
        </ul>
        <div className="call">
          * 추천 탭 및 배너 요청은 하단 메일로 연락 부탁드립니다.
        </div>
      </div>
    </div>
  );
};

export default MyProject;

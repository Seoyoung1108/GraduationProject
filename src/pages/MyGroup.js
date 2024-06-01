import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubGroupItem from "../components/SubGroupItem";
import "./MyProject.scss";
import axios from "axios";

const MyGroup = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [groups, setGroups] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/group/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setGroups(response.data.groupExhibitResponses);
      });
  }, []);

  return (
    <div className="Diary">
      <div className="MyProject">
        <div className="Title">
          <div className="Letter">
            <h1>내 단체 전시관</h1>
          </div>
          <Link style={{ textDecoration: "none" }} to="/mypage/mygroup/invited">
            <div className="nowinvited">단체 전시 초대 현황</div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/mypage/mygroup/upload">
            <div className="CreateButton">새로 만들기</div>
          </Link>
        </div>
        <div className="Guide">
          단체 전시관을 만들어 동료들과 함께 단체 전시회를 개최하세요!
        </div>
        <div className="Line"></div>
        <ul className="ArtList">
          {groups &&
            groups.map((groups) => (
              <Link
                to={`/mypage/mygroup/${groups.id}`}
                style={{ textDecoration: "none" }}
              >
                <SubGroupItem groups={groups} key={groups.id} />
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

export default MyGroup;

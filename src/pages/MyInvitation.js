import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubArtItem from "../components/SubArtItem";
import SubGroupItem from "../components/SubGroupItem";
import "./MyProject.scss";
import axios from "axios";

const MyInvitation = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [arts, setArts] = useState(null);
  const [groups, setGroups] = useState(null);
  const [id, setId] = useState("");
  const [isGroup, setIsGroup] = useState(0);

  useEffect(() => {
    axios
      .get("/api/v1/exhibit/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.exhibitResponses) {
          let distributed = [];
          for (let i = 0; i < response.data.exhibitResponses.length; i++) {
            if (response.data.exhibitResponses[i].distribute === true) {
              distributed.push(response.data.exhibitResponses[i]);
            }
          }
          setArts(distributed);
        }
      });

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
            <h2>초대장을 만들 작품 및 단체 전시관을 골라주세요.</h2>
          </div>
        </div>
        <div className="Guide">메일과 카카오톡으로 전시를 공유해 보세요!</div>
        <div className="Line"></div>
        <ul className="ArtList">
          {arts &&
            arts.map((arts) => (
              <button
                className="SubArtButton"
                onClick={() => {
                  setId(arts.id);
                  setIsGroup(0);
                }}
              >
                <SubArtItem arts={arts} key={arts.id} />
              </button>
            ))}
        </ul>
        <div className="Line"></div>
        <ul className="ArtList">
          {groups &&
            groups.map((groups) => (
              <button
                className="SubArtButton"
                onClick={() => {
                  setId(groups.id);
                  setIsGroup(1);
                }}
              >
                <SubGroupItem groups={groups} key={groups.id} />
              </button>
            ))}
        </ul>
        <Link to={`/mypage/myinvitation/${id}`} state={{ isGroup: isGroup }}>
          <button className="submit">만들기</button>
        </Link>
      </div>
    </div>
  );
};

export default MyInvitation;

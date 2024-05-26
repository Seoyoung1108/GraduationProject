import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SubArtItem from "../components/SubArtItem";
import "./MyProject.scss";
import axios from "axios";

const UploadMyGroupProject = () => {
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();

  const { groupId } = useParams();
  const groupName = location.state.name;

  const [arts, setArts] = useState(null);
  const [exhibitId, setExhibitId] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/exhibit/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        let distributed = [];
        for (let i = 0; i < response.data.exhibitResponses.length; i++) {
          if (response.data.exhibitResponses[i].distribute === true) {
            distributed.push(response.data.exhibitResponses[i]);
          }
        }
        setArts(distributed);
      });
  }, []);

  function onClickUpload(e) {
    fetch(`/api/v1/group/${groupId}/exhibit/${exhibitId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = `/groups/${groupName}/${groupId}`;
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="Diary">
      <div className="MyProject">
        <div className="Title">
          <div className="Letter">
            <h2>'{groupName}'에 업로드 할 프로젝트를 골라주세요.</h2>
          </div>
        </div>
        <div className="Line"></div>
        <ul className="ArtList">
          {arts &&
            arts.map((arts) => (
              <button
                className="SubArtButton"
                onClick={() => setExhibitId(arts.id)}
              >
                <SubArtItem arts={arts} key={arts.id} />
              </button>
            ))}
        </ul>
        <button className="submit" type="submit" onClick={onClickUpload}>
          등록
        </button>
      </div>
    </div>
  );
};

export default UploadMyGroupProject;

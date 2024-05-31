import "./Main.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Banner from "../components/Banner";
import ArtItem from "../components/ArtItem";
import GroupItem from "../components/GroupItem";
import { FiPlusCircle } from "react-icons/fi";
import { ArtWorks, GroupExhibitions } from "../TestCases";
import axios from "axios";

const Main = () => {
  const [arts, setArts] = useState(null);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/exhibit").then((response) => {
      if (response.data.exhibitResponses.length > 3) {
        setArts(response.data.exhibitResponses.slice(0, 3));
      } else {
        setArts(response.data.exhibitResponses);
      }
    });

    axios.get("/api/v1/group/groups").then((response) => {
      if (response.data.groupExhibitResponses.length > 3) {
        setGroups(response.data.groupExhibitResponses.slice(0, 3));
      } else {
        setGroups(response.data.groupExhibitResponses);
      }
    });
  }, []);

  if (!arts || !groups) {
    return null;
  }

  return (
    <div className="Main">
      <div className="BannerFrame">
        <Banner />
      </div>
      <div className="Line"></div>
      <div className="Title">
        <div className="Letter">단체 전시관</div>
        <Link style={{ textDecoration: "none" }} to={`/groups`}>
          <div className="GoToSee">
            <FiPlusCircle />
          </div>
        </Link>
      </div>
      <ul className="ArtList">
        {groups.map((groups) => (
          <GroupItem groups={groups} key={groups.id} />
        ))}
      </ul>
      <div className="Line"></div>
      <div className="Title">
        <div className="Letter">개인 전시관</div>
        <Link style={{ textDecoration: "none" }} to={`/arts`}>
          <div className="GoToSee">
            <FiPlusCircle />
          </div>
        </Link>
      </div>
      <ul className="ArtList">
        {arts.map((arts) => (
          <ArtItem arts={arts} key={arts.id} />
        ))}
      </ul>
      <div className="Line"></div>
    </div>
  );
};

export default Main;

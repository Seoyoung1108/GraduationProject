import "./Main.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import GroupItem from "../components/GroupItem";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const GroupExhibition = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [groups, setGroups] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [inputWord, setInputWord] = useState("");

  const saveInputWord = (e) => {
    setInputWord(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/v1/group/groups", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setGroups(response.data.groupExhibitResponses);
        if (response.data.groupExhibitResponses.length > 3) {
          setRecommend(response.data.groupExhibitResponses.slice(0, 3));
        } else {
          setRecommend(response.data.groupExhibitResponses);
        }
      });
  }, []);

  if (!groups) {
    return null;
  }

  function onClickFind(e) {
    fetch(`/api/v1/post?keyword=${inputWord}&page=1&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //setPosts(response.content);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="Main">
      <div className="Recommend">
        <div className="Title">이번 달 추천</div>
        <ul className="ArtList">
          {recommend.map((groups) => (
            <GroupItem groups={groups} key={groups.id} />
          ))}
        </ul>
      </div>
      <div className="Filtering">
        <div className="Finder">
          <input
            className="Category"
            type="text"
            value={inputWord}
            onChange={saveInputWord}
          ></input>
          <button onClick={onClickFind}>
            <BsSearch size="17" />
          </button>
        </div>
      </div>
      <ul className="ArtList">
        {groups.map((groups) => (
          <GroupItem groups={groups} key={groups.id} />
        ))}
      </ul>
    </div>
  );
};

export default GroupExhibition;

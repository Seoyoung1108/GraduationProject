import "./Main.scss";
import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ArtItem from "../components/ArtItem";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const PerGroup = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { groupId } = useParams();

  const [arts, setArts] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");

  const categories = ["전체", "회화", "디자인", "사진", "조각", "기타"];
  const [inputWord, setInputWord] = useState("");

  const saveInputWord = (e) => {
    setInputWord(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/group/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputName(response.data.name);
        setInputIntroduction(response.data.introduction);
        setArts(response.data.exhibits.exhibitResponses);
      });
  }, []);

  if (!arts) {
    return null;
  }

  function onClickFilter(e) {
    const category = e.target.value;
    fetch(`/api/v1/group/groups/${groupId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let filteredExhibit = [];
        if (category === "전체") {
          setArts(response.exhibits.exhibitResponses);
        } else {
          for (let i = 0; i < response.exhibits.exhibitResponses.length; i++) {
            if (response.exhibits.exhibitResponses[i].workType === category) {
              filteredExhibit.push(response.exhibits.exhibitResponses[i]);
            }
          }
          setArts(filteredExhibit);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function onClickFind(e) {
    fetch(`/api/v1/exhibit/keyword?keyword=${inputWord}&page=1&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        keyword: inputWord,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setArts(response.content);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="Main">
      <div className="GroupName">
        <h1>{inputName}</h1>
        <p>{inputIntroduction}</p>
      </div>
      <div className="Filtering">
        {categories.map((categories) => (
          <>
            <button
              className="Filter"
              onClick={onClickFilter}
              value={categories}
              pages={categories}
              key={categories}
            >
              {categories}
            </button>
            <div className="Bar"></div>
          </>
        ))}
        {/*
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
        </div>*/}
      </div>
      <ul className="ArtList">
        {arts.map((arts) => (
          <ArtItem arts={arts} key={arts.id} />
        ))}
      </ul>
    </div>
  );
};

export default PerGroup;

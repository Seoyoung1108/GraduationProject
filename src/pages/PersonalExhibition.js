import "./Main.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ArtItem from "../components/ArtItem";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const PersonalExhibition = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [arts, setArts] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const categories = ["전체", "회화", "디자인", "사진", "조각", "기타"];
  const [inputWord, setInputWord] = useState("");

  const saveInputWord = (e) => {
    setInputWord(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/v1/exhibit", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setArts(response.data.exhibitResponses);
        if (response.data.exhibitResponses.length > 3) {
          setRecommend(response.data.exhibitResponses.slice(0, 3));
        } else {
          setRecommend(response.data.exhibitResponses);
        }
      });
  }, []);

  if (!arts) {
    return null;
  }

  function onClickFilter(e) {
    const category = e.target.value;

    if (category === "전체") {
      fetch("/api/v1/exhibit", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setArts(response.exhibitResponses);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      fetch(`/api/v1/exhibit/exhibits/${category}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setArts(response.exhibitResponses);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  function onClickFind(e) {
    fetch(`/api/v1/exhibit/keyword?keyword=${inputWord}&page=1&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
      <div className="Recommend">
        <div className="Title">이번 달 추천</div>
        <ul className="ArtList">
          {recommend.map((arts) => (
            <ArtItem arts={arts} key={arts.id} />
          ))}
        </ul>
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
        {arts.map((arts) => (
          <ArtItem arts={arts} key={arts.id} />
        ))}
      </ul>
    </div>
  );
};

export default PersonalExhibition;

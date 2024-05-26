import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommunityItem from "../components/CommunityItem";
import "./Bulletin.scss";
import { BsSearch } from "react-icons/bs";

const Community = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [posts, setPosts] = useState(null);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];
  const [inputWord, setInputWord] = useState("");

  const saveInputWord = (e) => {
    setInputWord(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/post/list?page=1&size=10`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data.content);
      });
  }, []);

  if (!posts) {
    return null;
  }

  function onClickPage(e) {
    const page = e.target.value;
    fetch(`/api/v1/post/list?page=${page}&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPosts(response.content);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
        setPosts(response.content);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="Diary">
      <div className="Bulletin">
        <div className="Title">
          <div className="Letter">
            <h1>커뮤니티</h1>
          </div>
          {(() => {
            if (accessToken) {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/community/upload`}
                >
                  <div className="CreateButton">글쓰기</div>
                </Link>
              );
            }
          })()}
        </div>

        <div className="Line"></div>
        <div className="StartContent">
          <div className="info4">제목</div>
          <div className="info5">작성자</div>
          <div className="info3">등록일</div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          {posts.map((posts) => (
            <CommunityItem posts={posts} key={posts.postId} />
          ))}
        </div>
        <div className="Line"></div>
        <div className="Pages">
          {pages.map((pages) => (
            <button
              onClick={onClickPage}
              value={pages}
              pages={pages}
              key={pages}
            >
              {pages}
            </button>
          ))}
        </div>
        <div className="Filter">
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
    </div>
  );
};

export default Community;

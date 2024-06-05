import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommunityItem from "../components/CommunityItem";
import "./Bulletin.scss";
import { BsSearch } from "react-icons/bs";

const Community = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [posts, setPosts] = useState(null);
  const [pages, setPages] = useState([1]);
  const categories = ["전체", "자유", "질문"];
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
        let filteredPages = [];
        for (let i = 1; i <= response.data.totalPages; i++) {
          filteredPages.push(i);
        }
        setPages(filteredPages);
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

  function onClickFilter(e) {
    const category = e.target.value;
    const nameCategory = category === "자유" ? "CHAT" : "QUESTION";

    if (category === "전체") {
      fetch(`/api/v1/post/list?page=1&size=10`, {
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
    } else {
      fetch(`/api/v1/post/category/${nameCategory}?page=1&size=10`, {
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
  }

  return (
    <div className="Diary">
      <div className="Bulletin">
        <div className="Title">
          <div className="Letter">
            <div>
              <h1>커뮤니티</h1>
            </div>
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
        <div className="Guide">
          커뮤니티에서 졸업작품을 준비하며 생기는 고민을 나눠 보세요. 작품을
          준비하며 조언을 구하고 받아 보세요. <br />
          다양한 학교의 학생들과 소통하며 친목을 다지고, 서로의 이야기를 공유해
          보세요.
        </div>
        <div className="Filtering">
          <div className="Bar"></div>
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
    </div>
  );
};

export default Community;

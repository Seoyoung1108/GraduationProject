import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/20240427_002645.png";
import advertisepic from "../assets/6864606.jpg";

const Login = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const [inputId, setInputId] = useState(""); //메일
  const [inputPw, setInputPw] = useState(""); //비번

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };

  function onClickLogin(e) {
    fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputId,
        password: inputPw,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        document.location.href = "/";
      })
      .catch(() => {
        alert("다시 로그인해주세요.");
      });
    e.preventDefault();
  }

  return (
    <div className="Login">
      <div className="LoginForm">
        <div className="Title">로그인</div>
        <form onSubmit={onClickLogin}>
          <div className="Input">
            <input
              id="id"
              type="text"
              placeholder="Email"
              value={inputId}
              onChange={saveInputId}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={inputPw}
              onChange={saveInputPw}
            />
          </div>
          <button type="submit">로그인</button>
        </form>
        <div className="Options">
          <Link to="/signup">
            <button className="join">회원가입</button>
          </Link>
          <Link to="/findID">
            <button className="join">아이디 찾기</button>
          </Link>
          <Link to="/findPW">
            <button className="join">비밀번호 찾기</button>
          </Link>
        </div>
      </div>
      <div className="Advertise">
        <a
          href="https://www.coupang.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={advertisepic} />
        </a>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyInformation.scss";
import { Link, useLocation } from "react-router-dom";

const FindPW = () => {
  const accessToken = localStorage.getItem("tempAccessToken");
  const { state } = useLocation();
  const { id } = state; //Email
  const [inputPw, setInputPw] = useState("");

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };

  function onClickUpdate(e) {
    fetch("/api/v1/auth/pw", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        password: inputPw,
      }),
    })
      .then((response) => {
        alert("비밀번호가 수정되었습니다.");
        localStorage.removeItem("tempAccessToken");
        document.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="Diary">
      <div className="MyInformation">
        <div className="Title">
          <div className="Letter">
            <h1>비밀번호 수정</h1>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <form onSubmit={onClickUpdate}>
            <p>Email</p>
            <div className="NeedVerify">
              <input disabled={true} type="text" value={id} />
            </div>
            <p>새로운 비밀번호</p>
            <input
              id="password"
              type="password"
              value={inputPw}
              onChange={saveInputPw}
            />
            <button className="submit" type="submit">
              수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPW;

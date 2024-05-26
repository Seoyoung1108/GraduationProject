import "./Header.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineBell } from "react-icons/hi";
import { Notices } from "../TestCases";
import NoticeItem from "./NoticeItem";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  const notices = Notices;
  const accessToken = localStorage.getItem("accessToken");
  const [isLogin, setIsLogin] = useState(0);
  const [myNickName, setMyNickName] = useState("");
  const [myProfile, setMyProfile] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.status === 401) {
          //localStorage.clear(); //로그인 관련 정보 다 삭제(내 닉네임, 토큰들)
        } else {
          localStorage.setItem("myNickName", response.data.nickname);
          localStorage.setItem("myProfile", response.data.imageUrl);
          setMyNickName(response.data.nickname);
          setMyProfile(response.data.imageUrl);
          setIsLogin(1);
        }
      });
  }, []);

  function onClickBlock(e) {
    alert("로그인 후 사용해주세요.");
  }

  return (
    <header className="Header">
      <div className="ShowMenu">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="SiteName">Jolvre 졸브르</div>
        </Link>
        <div className="Options">
          <Link to="/groups">
            <div className="Option">단체 전시관</div>
          </Link>
          <Link to="/arts">
            <div className="Option">개인 전시관</div>
          </Link>
          <Link to="/FAQ">
            <div className="Option">FAQ</div>
          </Link>
          {(() => {
            if (isLogin === 1) {
              return (
                <Link to="/community">
                  <div className="Option">커뮤니티</div>
                </Link>
              );
            } else {
              return (
                <div className="Option" onClick={onClickBlock}>
                  커뮤니티
                </div>
              );
            }
          })()}
          {(() => {
            if (isLogin === 1) {
              return (
                <Link to="/mypage/myinformation">
                  <div className="Option">마이페이지</div>
                </Link>
              );
            } else {
              return (
                <div className="Option" onClick={onClickBlock}>
                  마이페이지
                </div>
              );
            }
          })()}
          {(() => {
            if (isLogin === 1) {
              return (
                <div className="Profile">
                  <div className="letter">{myNickName}님</div>
                  <img src={myProfile} />
                </div>
              );
            } else {
              return (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <div className="Profile">
                    <div className="letter">로그인</div>
                    <IoPersonCircleOutline size={46} />
                  </div>
                </Link>
              );
            }
          })()}
        </div>
      </div>
      <button className="Notice">
        <HiOutlineBell size={35} />
        <div className="Bubbler">
          {notices.map((notices) => (
            <NoticeItem notices={notices} key={notices.id} />
          ))}
        </div>
      </button>
    </header>
  );
};

export default Header;

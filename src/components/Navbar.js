import "./Navbar.scss";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [select, setSelect] = useState(0);
  const onClick0 = () => {
    setSelect(0);
  };
  const onClick1 = () => {
    setSelect(1);
  };
  const onClick2 = () => {
    setSelect(2);
  };
  const onClick3 = () => {
    setSelect(3);
  };
  return (
    <header className="Navbar">
      <div className="ShowMenu">
        <div className="Title">마이페이지</div>
        <div className="Line"></div>
        <Link to="/mypage/myinformation">
          <div
            onClick={onClick0}
            style={{
              color: select === 0 ? "#bf9e27" : "#d8d8d8",
            }}
          >
            내 정보
          </div>
        </Link>
        <Link to="/mypage/myproject">
          <div
            onClick={onClick1}
            style={{
              color: select === 1 ? "#bf9e27" : "#d8d8d8",
            }}
          >
            내 프로젝트
          </div>
        </Link>
        <Link to="/mypage/mygroup">
          <div
            onClick={onClick3}
            style={{
              color: select === 3 ? "#bf9e27" : "#d8d8d8",
            }}
          >
            내 단체 전시관
          </div>
        </Link>
        <Link to="/mypage/myinvitation">
          <div
            onClick={onClick2}
            style={{
              color: select === 2 ? "#bf9e27" : "#d8d8d8",
            }}
          >
            초대장 만들기
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

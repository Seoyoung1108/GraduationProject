import "./Header.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineBell } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Notices } from "../TestCases";
import NoticeItem from "./NoticeItem";
import PerChatRoom from "./PerChatRoom";
import ChatRooms from "./ChatRooms";

const Header = () => {
  const notices = Notices;
  const accessToken = localStorage.getItem("accessToken");
  const [isLogin, setIsLogin] = useState(0);
  const [myNickName, setMyNickName] = useState("");
  const [myProfile, setMyProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  async function getNewToken() {
    const response = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    });

    const data = await response.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  useEffect(() => {
    axios
      .get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.status === 401) {
          if (accessToken) {
            // 액세스 토큰 만료
            if (accessToken !== "undefined") {
              // 리프레시는 정상
              getNewToken();
            } else {
              // 리프레시도 만료
              localStorage.clear(); //로그인 관련 정보 다 삭제(내 닉네임, 토큰들)
            }
            window.location.reload();
          } // 액세스 토큰이 없는 로그인 안한 상태면 다 암것도 안함
        } else {
          localStorage.setItem("myNickName", response.data.nickname);
          localStorage.setItem("myProfile", response.data.imageUrl);
          setMyNickName(response.data.nickname);
          setMyProfile(response.data.imageUrl);
          setIsLogin(1);
        }
      });
  }, []);

  useEffect(() => {
    // 토큰 있을 때만 채팅방 호출
    if (isOpen === true && accessToken) {
      axios
        .get(`/chat/rooms`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setChatRooms(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isOpen]);

  function onClickBlock(e) {
    alert("로그인 후 사용해주세요.");
  }

  function onClickAlarm(e) {
    setIsOpen(!isOpen);
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
    setSelectedChatRoom(null);
  };

  const handleChatRoomClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  const renderChatTabContent = () => {
    if (selectedChatRoom) {
      return <PerChatRoom chatRoom={selectedChatRoom} />;
    }
    return chatRooms.map((chatRoom) => (
      <ChatRooms
        chatRoom={chatRoom}
        key={chatRoom.roomId}
        onClick={() => handleChatRoomClick(chatRoom)}
      />
    ));
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          {" "}
          채팅{" "}
        </li>
      ),
      tabCont: <div className="PerChatBubbler">{renderChatTabContent()}</div>,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          {" "}
          알림{" "}
        </li>
      ),
      tabCont: <div></div>,
    },
  ];

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
              if (myProfile === null) {
                return (
                  <div className="Profile">
                    <div className="letter">{myNickName}님</div>
                    <IoPersonCircleOutline size={46} />
                  </div>
                );
              } else {
                return (
                  <div className="Profile">
                    <div className="letter">{myNickName}님</div>
                    <img src={myProfile} />
                  </div>
                );
              }
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
      <div className="Notice">
        <button className="Bell" onClick={onClickAlarm}>
          <HiOutlineBell size={40} />
        </button>
        {(() => {
          if (isOpen === true) {
            return (
              <div className="Bubbler">
                {/* 
                {notices.map((notices) => (
                  <NoticeItem notices={notices} key={notices.id} />
                ))}
                <button className="ss">예시버튼</button>*/}

                <div className="Tabs">
                  <ul className="is-boxed">
                    {tabContArr.map((section, index) => {
                      return section.tabTitle;
                    })}
                  </ul>
                </div>
                {tabContArr[activeIndex].tabCont}
              </div>
            );
          }
        })()}
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import advertisepic from "../assets/6864606.jpg";
import Modal from "react-modal";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [inputId, setInputId] = useState(""); //메일
  const [inputPw, setInputPw] = useState(""); //비번
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [inputAuthNum, setInputAuthNum] = useState("");

  const clientId =
    "860691160146-n8e8qvksfbop58pnb18aahi90t3e3ppo.apps.googleusercontent.com";

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const saveInputAuthNum = (e) => {
    setInputAuthNum(e.target.value);
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
        if (response.status === 401) {
          alert("아이디 또는 비밀번호를 다시 확인해 주세요.");
        } else {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          document.location.href = "/";
        }
      })
      .catch(() => {
        alert("다시 로그인해주세요.");
      });
    e.preventDefault();
  }

  const Rest_api_key = "886e5c45d9be130f6770a898d8c0c4f7"; //REST API KEY
  const redirect_uri = "http://localhost:3000/kakaologin"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  function onClickAuthLogin(e) {
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
        if (response.status === 401) {
          alert("아이디 또는 비밀번호를 다시 확인해 주세요.");
        } else {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          document.location.href = "/";
        }
      })
      .catch(() => {
        alert("다시 로그인해주세요.");
      });
    e.preventDefault();
  }

  function onClickSend(e) {
    fetch(`/api/v1/auth/pw/email/${inputId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.user === false) {
          alert("가입되지 않은 이메일입니다.");
        } else {
          alert("작성하신 메일로 인증 번호가 전송되었습니다.");
          setIsVerified(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickVerify(e) {
    fetch("/api/v1/auth/pw/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputId,
        authNum: inputAuthNum,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.verifyResult === true) {
          localStorage.setItem(
            "tempAccessToken",
            response.tokenResponse.accessToken
          );
          navigate("/findPW", { state: { id: inputId } });
        } else {
          alert("메일 인증을 다시 해주세요.");
          setModalIsOpen(false);
          setIsVerified(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <>
      <div className="Login">
        <div className="LoginForm">
          <div className="Title">
            <div className="Letter">로그인</div>
            <div className="Options">
              <Link to="/signup">
                <button className="join">회원가입</button>
              </Link>
              {/*<button className="join">아이디 찾기</button>*/}
              <button className="join" onClick={() => setModalIsOpen(true)}>
                비밀번호 찾기
              </button>
            </div>
          </div>
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
            {/* 
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={(res) => {
                const responsePayload = jwtDecode(res.credential);
                console.log(responsePayload);
                onClickAuthLogin(responsePayload.email);
              }}
              onFailure={(err) => {
                console.log(err);
              }}
            />
          </GoogleOAuthProvider>
          <button onClick={handleLogin}>카카오 로그인</button>*/}
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
      <Modal
        className="InviteModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {(() => {
          if (isVerified === false) {
            return (
              <form onSubmit={onClickSend}>
                <div>
                  <p>가입하신 이메일을 적어주세요.</p>
                  <input
                    id="id"
                    type="text"
                    value={inputId}
                    onChange={saveInputId}
                  />
                </div>
                <div className="sub">
                  <button className="submit" type="submit">
                    인증 번호 보내기
                  </button>
                </div>
              </form>
            );
          } else {
            return (
              <form onSubmit={onClickVerify}>
                <div>
                  <p>메일로 전송된 인증 번호를 입력해주세요.</p>
                  <input
                    id="id"
                    type="text"
                    value={inputAuthNum}
                    onChange={saveInputAuthNum}
                  />
                </div>
                <div className="sub">
                  <button className="submit" type="submit">
                    인증하기
                  </button>
                </div>
              </form>
            );
          }
        })()}
      </Modal>
    </>
  );
};

export default Login;

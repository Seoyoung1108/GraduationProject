import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyInformation.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [inputId, setInputId] = useState(""); //Email
  const [inputPw, setInputPw] = useState("");
  const [inputAuthNum, setInputAuthNum] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputAge, setInputAge] = useState(20);
  const [inputCity, setInputCity] = useState("");
  const [inputSchool, setInputSchool] = useState("");
  const [isDupEmail, setIsDupEmail] = useState(true);
  const [isDupNick, setIsDupNick] = useState(true);
  //const [afterEmailDup, setAfterEmailDup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };
  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const saveInputAuthNum = (e) => {
    setInputAuthNum(e.target.value);
  };
  const saveInputName = (e) => {
    setInputName(e.target.value);
  };
  const saveInputNickName = (e) => {
    setInputNickName(e.target.value);
  };
  const saveInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const saveInputCity = (e) => {
    setInputCity(e.target.value);
  };
  const saveInputSchool = (e) => {
    setInputSchool(e.target.value);
  };

  function onClickDupEmail(e) {
    fetch(`/api/v1/signUp/check/email/${inputId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.duplicate) {
          alert("중복인 이메일입니다.");
        } else {
          setIsDupEmail(false);
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickDupNick(e) {
    fetch(`/api/v1/signUp/check/nickname/${inputNickName}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.duplicate) {
          alert("중복인 닉네임입니다.");
        } else {
          setIsDupNick(false);
          alert("사용 가능한 닉네임입니다.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickStartVerify(e) {
    fetch(`/api/v1/signUp/email/${inputId}`, {
      method: "GET",
    })
      .then((response) => {
        setIsOpen(true);
        alert("작성하신 메일로 인증 번호가 전송되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickVerify(e) {
    fetch("/api/v1/signUp/email", {
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
          setIsVerified(true);
          alert("메일 인증에 성공했습니다.");
        } else {
          alert("메일 인증을 다시 해주세요.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickJoin(e) {
    if (isDupEmail === false && isDupNick === false && isVerified === true) {
      fetch("/api/v1/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputId,
          name: inputName,
          password: inputPw,
          nickname: inputNickName,
          age: +inputAge,
          city: inputCity,
          school: inputSchool,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.accessToken) {
            alert("회원가입이 완료되었습니다.");
            document.location.href = "/login";
          } else {
            alert("회원가입에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else if (isDupEmail === true) {
      alert("이메일 중복 확인을 해주세요.");
    } else if (isDupNick === true) {
      alert("닉네임 중복 확인을 해주세요.");
    } else if (isVerified === false) {
      alert("메일 인증을 해주세요.");
    }
    e.preventDefault();
  }

  return (
    <div className="Diary">
      <div className="MyInformation">
        <div className="Title">
          <div className="Letter">
            <h1>회원가입</h1>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <form onSubmit={onClickJoin}>
            <p>Email</p>
            <div className="NeedVerify">
              <input
                id="id"
                type="text"
                value={inputId}
                onChange={saveInputId}
              />
              <button className="gotoverify" onClick={onClickDupEmail}>
                중복 확인
              </button>
              {(() => {
                if (isDupEmail === false) {
                  return (
                    <>
                      <div className="FinishVerify">
                        중복 확인이 완료되었습니다.
                      </div>
                      <button
                        className="gotoverify"
                        onClick={onClickStartVerify}
                        style={{ backgroundColor: "#610b0b" }}
                      >
                        메일 인증
                      </button>
                    </>
                  );
                }
              })()}
            </div>
            {(() => {
              if (isOpen === true) {
                if (isVerified === false) {
                  return (
                    <>
                      <p style={{ color: "#610b0b" }}>
                        메일로 전송된 인증 번호를 입력해주세요.
                      </p>
                      <div className="NeedVerify">
                        <input
                          id="id"
                          type="text"
                          value={inputAuthNum}
                          onChange={saveInputAuthNum}
                        />
                        <button className="gotoverify" onClick={onClickVerify}>
                          인증하기
                        </button>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div className="NeedVerify">
                      <div className="FinishVerify">
                        메일 인증이 완료되었습니다.
                      </div>
                    </div>
                  );
                }
              }
            })()}
            <p>비밀번호</p>
            <input
              id="password"
              type="password"
              value={inputPw}
              onChange={saveInputPw}
            />
            <p>이름</p>
            <input
              id="renumber"
              type="text"
              value={inputName}
              onChange={saveInputName}
            />
            <p>닉네임</p>
            <div className="NeedVerify">
              <input
                id="phonenumber"
                type="text"
                value={inputNickName}
                onChange={saveInputNickName}
              />
              <button className="gotoverify" onClick={onClickDupNick}>
                중복 확인
              </button>
              {(() => {
                if (isDupNick === false) {
                  return (
                    <div className="FinishVerify">
                      중복 확인이 완료되었습니다.
                    </div>
                  );
                }
              })()}
            </div>
            <p>나이</p>
            <input
              id="phonenumber"
              type="text"
              value={inputAge}
              onChange={saveInputAge}
            />
            <p>도시</p>
            <input
              id="phonenumber"
              type="text"
              value={inputCity}
              onChange={saveInputCity}
            />
            <p>학교</p>
            <input
              id="phonenumber"
              type="text"
              value={inputSchool}
              onChange={saveInputSchool}
            />
            <button className="submit" type="submit">
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

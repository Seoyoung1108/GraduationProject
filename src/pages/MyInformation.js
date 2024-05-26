import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MyInformation.scss";
import axios from "axios";
import { IoIosImages } from "react-icons/io";

const MyInformation = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [inputId, setInputId] = useState(""); //Email
  //const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputAge, setInputAge] = useState(20);
  const [inputCity, setInputCity] = useState("");
  const [inputSchool, setInputSchool] = useState("");
  const [isVerifed, setIsVerified] = useState(false);
  const [inputImage, setInputImage] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputName(response.data.name);
        setInputId(response.data.email);
        setInputNickName(response.data.nickname);
        setInputAge(response.data.age);
        setInputCity(response.data.city);
        setInputSchool(response.data.school);
        if (response.data.role === "STUDENT") {
          setIsVerified(true);
        }
        setInputImage(response.data.imageUrl);
      });
  }, []);

  function onClickVerify(e) {
    if (
      window.confirm(
        inputSchool + "의 메일인 " + inputId + "로 학교 인증을 하시겠습니까?"
      )
    ) {
      fetch("/api/v1/auth/student/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: inputId,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          document.location.href = "/mypage/myinformation";
          alert("학교 인증에 성공했습니다.");
        })
        .catch((error) => {
          alert("학교 인증에 실패했습니다. 다시 시도해주세요.");
          console.log(error.response);
        });
    } else {
      e.preventDefault();
    }
  }

  return (
    <div className="Diary">
      <div className="MyInformation">
        <div className="Title">
          <div className="Letter">
            <h1>내 정보</h1>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <form>
            <p>이름</p>
            <input disabled={true} type="text" value={inputName} />
            <p>닉네임</p>
            <input disabled={true} type="text" value={inputNickName} />
            <p>Email (ID)</p>
            <input disabled={true} type="text" value={inputId} />
            <p>나이</p>
            <input disabled={true} type="text" value={inputAge} />
            <p>도시</p>
            <input disabled={true} type="text" value={inputCity} />
            <p>학교</p>
            <input disabled={true} type="text" value={inputSchool} />
            <p>학생 인증 여부</p>
            {(() => {
              if (isVerifed === true) {
                return <div className="verified">예</div>;
              } else {
                return (
                  <div className="nonverified">
                    아니오
                    <button className="gotoverify" onClick={onClickVerify}>
                      인증하기
                    </button>
                  </div>
                );
              }
            })()}
            <p>프로필 사진</p>
            <div className="Profile">
              {(() => {
                if (inputImage === null) {
                  return <IoIosImages size={50} />;
                } else {
                  return <img src={inputImage} />;
                }
              })()}
            </div>
            <Link to="/mypage/myinformation/update">
              <button className="submit">수정</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyInformation;

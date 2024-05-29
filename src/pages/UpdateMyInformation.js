import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MyInformation.scss";
import { IoIosImages } from "react-icons/io";
import axios from "axios";

const UpdateMyInformation = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [inputNickName, setInputNickName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [file, setFile] = useState(null);

  const [prevId, setPrevId] = useState(""); //Email
  const [prevName, setPrevName] = useState("");
  const [prevSchool, setPrevSchool] = useState("");
  const [prevImage, setPrevImage] = useState(null);

  const saveInputNickName = (e) => {
    setInputNickName(e.target.value);
  };
  const saveInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const saveInputCity = (e) => {
    setInputCity(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPrevName(response.data.name);
        setPrevId(response.data.email);
        setInputNickName(response.data.nickname);
        setInputAge(response.data.age);
        setInputCity(response.data.city);
        setPrevSchool(response.data.school);
        setPrevImage(response.data.imageUrl);
      });
  }, []);

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);

      // 미리보기
      const reader = new FileReader();
      reader.onload = function (e) {
        setPrevImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onClickUpdate(e) {
    const formData = new FormData();

    if (file !== null) {
      formData.append("image", file);
    }
    formData.append("name", prevName);
    formData.append("nickname", inputNickName);
    formData.append("age", +inputAge);
    formData.append("city", inputCity);

    axios
      .patch("/api/v1/user", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage/myinformation";
        alert("정보가 수정되었습니다.");
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
            <h1>내 정보</h1>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          <form onSubmit={onClickUpdate}>
            <p>이름</p>
            <input disabled={true} type="text" value={prevName} />
            <p>닉네임</p>
            <input
              type="text"
              value={inputNickName}
              onChange={saveInputNickName}
            />
            <p>Email (ID)</p>
            <input disabled={true} type="text" value={prevId} />
            <p>나이</p>
            <input type="text" value={inputAge} onChange={saveInputAge} />
            <p>도시</p>
            <input type="text" value={inputCity} onChange={saveInputCity} />
            <p>학교</p>
            <input disabled={true} type="text" value={prevSchool} />
            <p>프로필 사진</p>
            <div className="Profile">
              {(() => {
                if (prevImage === null) {
                  return <IoIosImages size={50} />;
                } else {
                  return <img src={prevImage} />;
                }
              })()}
            </div>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeImg}
            />
            <button className="submit">수정</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyInformation;

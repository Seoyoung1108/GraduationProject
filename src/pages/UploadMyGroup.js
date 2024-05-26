import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyProject.scss";
import { Link } from "react-router-dom";

const UploadMyGroup = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [inputName, setInputName] = useState("");
  const [inputProduct, setInputProduct] = useState("10명 / 5000원");
  const [inputPeriod, setInputPeriod] = useState("1개월");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [file, setFile] = useState(null);
  const [seeFile, setSeeFile] = useState(null);

  const saveInputName = (e) => {
    setInputName(e.target.value);
  };
  const saveInputProduct = (e) => {
    setInputProduct(e.target.value);
  };
  const saveInputPeriod = (e) => {
    setInputPeriod(e.target.value);
  };
  const saveInputIntroduction = (e) => {
    setInputIntroduction(e.target.value);
  };

  const onChangeFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);

      // 미리보기
      const reader = new FileReader();
      reader.onload = function (e) {
        setSeeFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onClickUpload(e) {
    const formData = new FormData();

    formData.append("thumbnail", file);
    formData.append("name", inputName);
    formData.append("selectedItem", inputProduct);
    formData.append("period", inputPeriod);
    formData.append("introduction", inputIntroduction);

    fetch("/api/v1/group", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage/mygroup";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="Diary">
      <div className="MyProject">
        <div className="Content">
          <form onSubmit={onClickUpload}>
            <p>썸네일</p>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeFile}
            />
            <img className="see" src={seeFile} />
            <div className="Bundle">
              <div>
                <p>단체 전시관 이름</p>
                <input
                  id="id"
                  type="text"
                  value={inputName}
                  onChange={saveInputName}
                />
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>상품 선택</p>
                <select id="product" onChange={saveInputProduct}>
                  <option value="10명 / 5000원">10명 / 5000원</option>
                  <option value="20명 / 9000원">20명 / 9000원</option>
                  <option value="30명 / 13000원">30명 / 13000원</option>
                  <option value="40명 / 17000원">40명 / 17000원</option>
                  <option value="50명 / 20000원">50명 / 20000원</option>
                </select>
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>개최 기간 선택</p>
                <select id="period" onChange={saveInputPeriod}>
                  <option value="1개월">1개월</option>
                  <option value="2개월">2개월</option>
                  <option value="3개월">3개월</option>
                  <option value="4개월">4개월</option>
                  <option value="5개월">5개월</option>
                </select>
                {" (* 개최 기간 종료 후에는 지난 전시회로 분류됩니다.)"}
              </div>
            </div>
            <p>전시관 소개</p>
            <textarea
              className="WriteContent"
              value={inputIntroduction}
              onChange={saveInputIntroduction}
            ></textarea>
            <button className="submit" type="submit">
              등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMyGroup;

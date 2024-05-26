import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyProject.scss";
import { useParams } from "react-router-dom";

const UpdateMyProject = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { exhibitId } = useParams();
  const [prevImage, setPrevImage] = useState(null);
  const [prevImages, setPrevImages] = useState(null);

  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthorWord, setInputAuthorWord] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputProductionMethod, setInputProductionMethod] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputType, setInputType] = useState("회화");
  const [inputVirtual, setInputVirtual] = useState(false);
  const [inputForSale, setInputForSale] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const saveInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const saveInputAuthorWord = (e) => {
    setInputAuthorWord(e.target.value);
  };
  const saveInputIntroduction = (e) => {
    setInputIntroduction(e.target.value);
  };
  const saveInputSize = (e) => {
    setInputSize(e.target.value);
  };
  const saveInputProductionMethod = (e) => {
    setInputProductionMethod(e.target.value);
  };
  const saveInputPrice = (e) => {
    setInputPrice(e.target.value);
  };
  const saveInputType = (e) => {
    setInputType(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/exhibit/${exhibitId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputTitle(response.data.title);
        setInputAuthorWord(response.data.authorWord);
        setInputIntroduction(response.data.introduction);
        setInputSize(response.data.size);
        setInputProductionMethod(response.data.productionMethod);
        setInputPrice(response.data.price);
        setInputType(response.data.workType);
        setInputForSale(response.data.forSale);
        setInputVirtual(response.data.checkVirtualSpace);
        setPrevImage(response.data.thumbnail);
        setPrevImages(response.data.imagesUrl);
        document.querySelector("input[id=isForSale]").checked =
          response.data.forSale;
        document.querySelector("input[id=isVirtual]").checked =
          response.data.checkVirtualSpace;
      });
  }, []);

  const onChangeCheckBoxSale = (e) => {
    const checkboxSale = document.getElementById("isForSale");

    const isCheckedSale = checkboxSale.checked;
    setInputForSale(isCheckedSale);
  };

  const onChangeCheckBoxVirtual = (e) => {
    const checkboxVirtual = document.getElementById("isVirtual");

    const isCheckedVirtual = checkboxVirtual.checked;
    setInputVirtual(isCheckedVirtual);
  };

  const onChangeFile = (e) => {
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

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files;
      setImages(uploadFile);

      // 미리보기
      let filteredImg = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
          filteredImg.push(reader.result);
        };
        reader.readAsDataURL(e.target.files[i]);
      }
      setPrevImages(filteredImg);
    }
  };

  function onClickUpdate(e) {
    const formData = new FormData();

    formData.append("thumbnail", file);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("title", inputTitle);
    formData.append("authorWord", inputAuthorWord);
    formData.append("introduction", inputIntroduction);
    formData.append("size", inputSize);
    formData.append("productionMethod", inputProductionMethod);
    formData.append("price", +inputPrice);
    formData.append("workType", inputType);
    formData.append("forSale", inputForSale);
    formData.append("checkVirtualSpace", inputVirtual);

    fetch(`/api/v1/exhibit/user/${exhibitId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        document.location.href = `/mypage/myproject/${exhibitId}`;
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
          <form onSubmit={onClickUpdate}>
            <p>썸네일 (*가상 전시회에 전시될 대표 사진입니다.)</p>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeFile}
            />
            <img className="see" src={prevImage} />
            <p>추가 사진 (최대 3개)</p>
            <input
              type="file"
              multiple
              id="profile-upload"
              accept="image/*"
              onChange={onChangeImg}
            />
            <div>
              {prevImages &&
                prevImages.map((image) => (
                  <img className="plussee" src={image} />
                ))}
            </div>
            <div className="Line"></div>
            <div className="Bundle">
              <div>
                <p>제목</p>
                <input
                  id="id"
                  type="text"
                  value={inputTitle}
                  onChange={saveInputTitle}
                />
              </div>
              <div>
                <p>판매 여부</p>
                <input
                  className="Check"
                  id="isForSale"
                  type="checkbox"
                  onChange={onChangeCheckBoxSale}
                />
              </div>
              <div>
                <p>가격</p>
                <input
                  id="renumber"
                  type="text"
                  value={inputPrice}
                  placeholder="(원)"
                  onChange={saveInputPrice}
                />
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>종류</p>
                <select id="product" onChange={saveInputType}>
                  <option value="회화">회화</option>
                  <option value="디자인">디자인</option>
                  <option value="사진">사진</option>
                  <option value="조각">조각</option>
                </select>
              </div>
              <div>
                <p>3D 모델 생성 여부 (*조각품일 경우 생성을 추천합니다.)</p>
                <input
                  className="Check"
                  id="isVirtual"
                  type="checkbox"
                  onChange={onChangeCheckBoxVirtual}
                />
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>크기</p>
                <input
                  id="phonenumber"
                  type="text"
                  value={inputSize}
                  placeholder="가로(cm) X 세로(cm)"
                  onChange={saveInputSize}
                />
              </div>
              <div>
                <p>제작 방식</p>
                <input
                  id="phonenumber"
                  type="text"
                  value={inputProductionMethod}
                  onChange={saveInputProductionMethod}
                />
              </div>
            </div>
            <p>작품 소개</p>
            <textarea
              className="WriteContent"
              value={inputIntroduction}
              onChange={saveInputIntroduction}
            ></textarea>
            <p>작가의 한마디</p>
            <textarea
              className="WriteWord"
              value={inputAuthorWord}
              onChange={saveInputAuthorWord}
              placeholder="이 작품을 볼 관람객들께 드리는 한마디"
            ></textarea>
            <button className="submit" type="submit">
              수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyProject;

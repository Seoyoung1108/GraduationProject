import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyProject.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const UploadMyProject = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthorWord, setInputAuthorWord] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputProductionMethod, setInputProductionMethod] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputType, setInputType] = useState("회화");
  const [inputForSale, setInputForSale] = useState(false);
  const [inputVirtual, setInputVirtual] = useState(false);
  const [inputBack3D, setInputBack3D] = useState(
    "https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/028_hdrmaps_com_free_4K.hdr"
  );
  const [inputBack2D, setInputBack2D] = useState("ss");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);
  const [seeFile, setSeeFile] = useState(null);
  const [seeImages, setSeeImages] = useState(null);

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
  const saveInputBack3D = (e) => {
    setInputBack3D(e.target.value);
  };
  const saveInputBack2D = (e) => {
    setInputBack2D(e.target.value);
  };

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
        setSeeFile(e.target.result);
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
      setSeeImages(filteredImg);
    }
  };

  function onClickUpload(e) {
    const formData = new FormData();
    const modelFormData = new FormData();

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
    formData.append("backgroundImage2d", inputBack2D);
    formData.append("backgroundImage3d", inputBack3D);
    modelFormData.append("file", file);

    fetch("/api/v1/exhibit/user", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.exhibitId);
        fetch(`/model?exhibit_id=${response.exhibitId}`, {
          method: "POST",
          body: modelFormData,
        });
        document.location.href = "/mypage/myproject";
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
            <p>썸네일 (*가상 전시회에 전시될 대표 사진입니다.)</p>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeFile}
            />
            <img className="see" src={seeFile} />
            <p>추가 사진 (최대 3개)</p>
            <input
              type="file"
              multiple
              id="profile-upload"
              accept="image/*"
              onChange={onChangeImg}
            />
            <div>
              {seeImages &&
                seeImages.map((image) => (
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
                  <option value="기타">기타</option>
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
              placeholder="이 작품의 관람객들께 드리는 한마디"
            ></textarea>
            <div className="Line"></div>
            {(() => {
              if (inputVirtual === false) {
                return (
                  <div className="Bundle">
                    <div>
                      <p>2D 전시회 배경 설정</p>
                      <select id="product" onChange={saveInputBack2D}>
                        <option value="">도시 해안가</option>
                        <option value="">유럽 도심</option>
                        <option value="">하늘과 들판</option>
                      </select>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="Bundle">
                    <div>
                      <p>
                        3D 전시회 배경 설정
                        <br />
                        (*의자는 예시입니다.)
                      </p>
                      <select id="product" onChange={saveInputBack3D}>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/circus_arena_4k.hdr">
                          중앙 무대
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/dancing_hall_4k.hdr">
                          작은 홀 1
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/solitude_interior_4k.hdr">
                          작은 홀 2
                        </option>
                        <option value="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/028_hdrmaps_com_free_4K.hdr">
                          해안가 도시
                        </option>
                        <option value="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/123_hdrmaps_com_free_4K.hdr">
                          유럽 도시
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/golden_bay_4k.hdr">
                          저녁의 부둣가
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/museumplein_4k.hdr">
                          박물관 앞 광장
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/drakensberg_solitary_mountain_puresky_4k.hdr">
                          하늘
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/limpopo_golf_course_4k.hdr">
                          들판 1
                        </option>
                        <option value="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/151_hdrmaps_com_free_4K.hdr">
                          들판 2
                        </option>
                        <option value="https://jolvre-background-bucket.s3.ap-northeast-3.amazonaws.com/snow_field_4k.hdr">
                          설원
                        </option>
                      </select>
                    </div>
                    <div className="Image">
                      <Helmet>
                        <script
                          type="module"
                          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
                        ></script>
                      </Helmet>
                      <model-viewer
                        src="https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/fbbf5586-3138-4dfc-94de-5a286e8a5728.glb"
                        shadow-intensity="1"
                        ar
                        camera-controls
                        touch-action="pan-y"
                        orientation="180deg 270deg 130deg"
                        skybox-image={inputBack3D}
                        environment-image={inputBack3D}
                        style={{ width: "30vw", height: "40vh" }}
                      ></model-viewer>
                    </div>
                  </div>
                );
              }
            })()}
            <button className="submit" type="submit">
              등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMyProject;

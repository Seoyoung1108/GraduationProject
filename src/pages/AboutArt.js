import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./AboutArt.scss";
import { IoIosImages } from "react-icons/io";
import axios from "axios";

const AboutArt = () => {
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const { exhibitId } = useParams();

  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthorWord, setInputAuthorWord] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputProductionMethod, setInputProductionMethod] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputThumbnail, setInputThumbnail] = useState(null);
  const [inputImages, setInputImages] = useState(null);
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputSchool, setInputtSchool] = useState("");
  const [noimages, setNoimages] = useState([0, 1, 2, 3]);

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
        setInputAuthor(response.data.userInfoResponse.nickname);
        setInputtSchool(response.data.userInfoResponse.school);
        setInputThumbnail(response.data.thumbnail);
        setInputImages(response.data.imagesUrl);
        setNoimages(noimages.slice(response.data.imagesUrl.length + 1, 4));
        console.log(noimages);
      });
  }, []);

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="AboutArt">
      <div className="Frame">
        <div className="Line"></div>
        <div className="Content">
          <div className="Container" style={{ overflow: "hidden" }}>
            <div
              className="Image"
              style={{
                transform:
                  select === 0
                    ? "none"
                    : select === 1
                      ? "translate(-37vw)"
                      : select === 2
                        ? "translate(-74vw)"
                        : "translate(-111vw)",
              }}
            >
              <div className="Item">
                <img src={inputThumbnail} />
              </div>
              {inputImages &&
                inputImages.map((image) => (
                  <div className="Item">
                    <img src={image} />
                  </div>
                ))}
              {noimages.map(() => (
                <div className="Item">
                  <IoIosImages />
                </div>
              ))}
            </div>
            <div className="Buttons">
              <button
                className="gotodif"
                onClick={onClick0}
                style={{
                  backgroundColor: select === 0 ? "#bdbdbd" : "#585858",
                }}
              ></button>
              <button
                className="gotodif"
                onClick={onClick1}
                style={{
                  backgroundColor: select === 1 ? "#bdbdbd" : "#585858",
                }}
              ></button>
              <button
                className="gotodif"
                onClick={onClick2}
                style={{
                  backgroundColor: select === 2 ? "#bdbdbd" : "#585858",
                }}
              ></button>
              <button
                className="gotodif"
                onClick={onClick3}
                style={{
                  backgroundColor: select === 3 ? "#bdbdbd" : "#585858",
                }}
              ></button>
            </div>
          </div>
          <div className="VerticalLine"></div>
          <div className="Info1">
            <div className="Title">"{inputTitle}"</div>
            <div className="Info1_More">
              <div className="More1">작가</div>
              <div className="More2">{inputAuthor}</div>
              <div className="More1">크기</div>
              <div className="More2">{inputSize}</div>
              <div className="More1">종류</div>
              <div className="More2">{inputType}</div>
              <div className="More1">제작방식</div>
              <div className="More2">{inputProductionMethod}</div>
              <div className="More1">판매가</div>
              <div className="More2">{inputPrice}</div>
            </div>
          </div>
        </div>
        <div className="Line"></div>
      </div>
      <div className="Frame">
        <div className="Line"></div>
        <div className="Content">
          <div className="Info2">
            <div className="More1">작품 소개</div>
            <div className="More2">{inputIntroduction}</div>
          </div>
          <div className="VerticalLine"></div>
          <div className="Info2">
            <div className="More1">작가 소개</div>
            <div className="More3">
              {inputAuthor} / {inputSchool}
            </div>
            <div className="More1">작가의 한마디</div>
            <div className="More3">{inputAuthorWord}</div>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Foot">
          <button className="Back" onClick={onClick}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutArt;

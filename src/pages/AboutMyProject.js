import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProject.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const AboutMyProject = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");

  const { exhibitId } = useParams();

  sessionStorage.setItem("artist", myNickName);

  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthorWord, setInputAuthorWord] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputProductionMethod, setInputProductionMethod] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputVirtual, setInputVirtual] = useState(false);
  const [isDistributed, setIsDistributed] = useState(false);
  const [inputBack3D, setInputBack3D] = useState("");
  const [inputBack2D, setInputBack2D] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);

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
        setInputVirtual(response.data.checkVirtualSpace);
        setInputBack2D(response.data.background2dImage);
        setInputBack3D(response.data.background3dImage);
        setIsDistributed(response.data.distribute);
        setFile(response.data.thumbnail);
        setImages(response.data.imagesUrl);
        document.querySelector("input[id=isForSale]").checked =
          response.data.forSale;
        document.querySelector("input[id=isVirtual]").checked =
          response.data.checkVirtualSpace;
      });
  }, []);

  const onClick = () => {
    document.location.href = "/mypage/myproject";
  };

  function onClickDelete(e) {
    if (window.confirm("프로젝트를 삭제하시겠습니까?")) {
      // 확인 시
      axios
        .delete(`/api/v1/exhibit/user/${exhibitId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          document.location.href = "/mypage/myproject";
          alert("프로젝트가 삭제되었습니다.");
        })
        .catch((error) => {});
    } else {
    }
    e.preventDefault();
  }

  function onClickDistribute(e) {
    fetch(`/api/v1/exhibit/user/${exhibitId}/distribute`, {
      method: "POST",
      body: JSON.stringify({
        exhibitId: exhibitId,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/arts";
        alert("배포되었습니다.");
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
          <form onSubmit={onClickDistribute}>
            <div className="Pictures">
              <div className="Thumbnail">
                <img src={file} />
              </div>
              <div className="Images">
                {images && images.map((image) => <img src={image} />)}
              </div>
            </div>
            <div className="Line"></div>
            <div className="Bundle">
              <div>
                <p>제목</p>
                <input disabled={true} id="id" type="text" value={inputTitle} />
              </div>
              <div>
                <p>판매 여부</p>
                <input
                  className="Check"
                  id="isForSale"
                  type="checkbox"
                  disabled={true}
                />
              </div>
              <div>
                <p>가격</p>
                <input
                  disabled={true}
                  id="id"
                  type="text"
                  value={inputPrice + " 원"}
                />
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>종류</p>
                <input
                  disabled={true}
                  id="renumber"
                  type="text"
                  value={inputType}
                />
              </div>
              <div>
                <p>3D 모델 생성 여부 (*조각품일 경우 생성을 추천합니다.)</p>
                <input
                  className="Check"
                  id="isVirtual"
                  type="checkbox"
                  disabled={true}
                />
              </div>
            </div>
            <div className="Bundle">
              <div>
                <p>크기</p>
                <input
                  disabled={true}
                  id="phonenumber"
                  type="text"
                  value={inputSize + " (cm X cm)"}
                />
              </div>
              <div>
                <p>제작 방식</p>
                <input
                  disabled={true}
                  id="phonenumber"
                  type="text"
                  value={inputProductionMethod}
                />
              </div>
            </div>
            <p>작품 소개</p>
            <textarea
              disabled={true}
              className="WriteContent"
              value={inputIntroduction}
            ></textarea>
            <p>작가의 한마디</p>
            <textarea
              disabled={true}
              className="WriteWord"
              value={inputAuthorWord}
            ></textarea>
            <div className="Line"></div>
            {(() => {
              if (inputVirtual === false) {
                return (
                  <div className="Bundle">
                    <div>
                      <p>2D 전시회 배경 설정</p>
                      <img src={inputBack2D} />
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
            <div className="Line"></div>
            <div className="warn">* 배포 시 개인 전시관에 전체 게시됩니다.</div>
            {(() => {
              if (isDistributed === false) {
                return (
                  <button className="submit" type="submit">
                    배포
                  </button>
                );
              } else {
                return (
                  <button
                    className="submit"
                    type="submit"
                    disabled={true}
                    style={{ backgroundColor: "black", cursor: "default" }}
                  >
                    배포 완료
                  </button>
                );
              }
            })()}
          </form>

          <div className="Buttons">
            <Link to={`/mypage/myproject/${exhibitId}/update`}>
              <button
                className="SubButtons"
                style={{ backgroundColor: "#bf9e27" }}
              >
                수정
              </button>
            </Link>
            <button
              className="SubButtons"
              onClick={onClickDelete}
              style={{ backgroundColor: "#610b0b" }}
            >
              삭제
            </button>
            <button className="SubButtons" onClick={onClick}>
              목록
            </button>
          </div>
          <Link to={`/arts/${inputTitle}/${exhibitId}/diary`}>
            <button className="gotoDiary">{">> 일기장"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutMyProject;

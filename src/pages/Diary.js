import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DiaryItem from "../components/DiaryItem";
import "./Bulletin.scss";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const Diary = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");
  const [isOpen, setIsOpen] = useState(false);

  const sectionRef = useRef(null); // useRef로 참조할 요소
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  const { exhibitId } = useParams();
  const { exhibitName } = useParams();
  const artist = sessionStorage.getItem("artist");
  const [diaries, setDiaries] = useState(null);
  const [images, setImages] = useState(null);
  const [widthX, setWidthX] = useState(50);

  useEffect(() => {
    axios
      .get(`/api/v1/diary/${exhibitId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setDiaries(response.data.diaryGetResponses);
      });

    axios
      .get(`/api/v1/diary/images/${exhibitId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setImages(response.data.images);
        setWidthX(50 + response.data.images.length * 450 - 1500);
        //console.log(50 + response.data.images.length * 450);
      });
  }, []);

  useEffect(() => {
    const pin = gsap.fromTo(
      // from, to, fromTo가 있다.
      sectionRef.current, // Gsap 애니메이션이 시작되는 요소 위치
      { translateX: 50 }, // from 부분(초기 시작)
      {
        translateX: -widthX, // to 부분 -> image 개수로
        ease: "none", // 쓸데없는 애니메이션 없애는 부분
        scrollTrigger: {
          // 스크롤 애니메이션 발생하는 부분
          trigger: triggerRef.current, // 스크롤이 발생되는 요소 위치
          start: "top top", // "요소위치 시작위치"
          end: "bottom bottom", // "요소위치 끝위치"
          scrub: 5, // 되감기 기능, 또한 스크롤을 부드러운 애니메이션 추가.
          pin: true, // 가로스크롤시 페이지를 고정할 수 있는 기능
        },
      }
    );

    return () => {
      pin.kill(); // 모든 애니메이션 중단
    };
  }, [isOpen]);

  if (!images) {
    return null;
  }

  gsap.registerPlugin(ScrollTrigger); // ScrollTrigger시 필수

  const onClick = () => {
    navigate(-1);
  };

  function onClickPanorama(e) {
    setIsOpen(!isOpen);
  }

  return (
    <div className="Diary">
      <div className="Bulletin">
        <div className="Title">
          <div className="Letter">
            <h1>{exhibitName}의 일기장</h1>
          </div>
          {(() => {
            if (myNickName === artist) {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/arts/${exhibitName}/${exhibitId}/diary/upload`}
                >
                  <div className="CreateButton">글쓰기</div>
                </Link>
              );
            }
          })()}
        </div>

        {(() => {
          if (myNickName === artist) {
            return (
              <div className="Guide">
                일기장에서 작품의 시작부터 끝까지의 전 과정에 대한 기록을 작성해
                보세요.
              </div>
            );
          } else {
            return (
              <div className="Guide">
                일기장에서 작품의 시작부터 끝까지의 전 과정에 대한 기록을 구경해
                보세요.
              </div>
            );
          }
        })()}
        <div className="Line"></div>
        <div className="StartContent">
          <div className="info1">번호</div>
          <div className="info2">제목</div>
          <div className="info3">등록일</div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          {diaries &&
            diaries.map((diaries) => (
              <DiaryItem diaries={diaries} key={diaries.id} />
            ))}
        </div>
        <div className="Line"></div>
        <div className="Foot">
          {(() => {
            if (isOpen === true) {
              return (
                <button
                  className="Back"
                  onClick={onClickPanorama}
                  style={{ backgroundColor: "#bf9e27", width: "140px" }}
                >
                  ⮝ 파노라마 닫기
                </button>
              );
            } else {
              return (
                <button
                  className="Back"
                  onClick={onClickPanorama}
                  style={{ backgroundColor: "#bf9e27", width: "140px" }}
                >
                  ⮟ 파노라마 보기
                </button>
              );
            }
          })()}
          <button className="Back" onClick={onClick}>
            돌아가기
          </button>
        </div>
      </div>
      {(() => {
        if (isOpen === true) {
          return (
            <div className="Panorama">
              <div className="Letter">사진으로 모아 보는 작품의 기록</div>
              <section id="project" className="project">
                <motion.div ref={triggerRef} className="frame">
                  {/* 여기서부터 Gsap 애니메이션 시작*/}
                  <div ref={sectionRef} className="animation">
                    {/* 여기 요소에서 ScrollTrigger 발생*/}
                    {images &&
                      images.map((images) => (
                        <div key={images} className="image">
                          <img src={images} />
                        </div>
                      ))}
                  </div>
                </motion.div>
              </section>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default Diary;

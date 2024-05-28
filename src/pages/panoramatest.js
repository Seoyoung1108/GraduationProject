import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./panoramatest.scss";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const Panoramatest = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");
  const location = useLocation();

  console.log("f");

  const exhibitId = 1;
  const [images, setImages] = useState(null);

  const sectionRef = useRef(null); // useRef로 참조할 요소
  const triggerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/v1/diary/user/${exhibitId}/images`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setImages(response.data.images);
      });

    const pin = gsap.fromTo(
      // from, to, fromTo가 있다.
      sectionRef.current, // Gsap 애니메이션이 시작되는 요소 위치
      { translateX: 100 }, // from 부분(초기 시작)
      {
        translateX: -6400, // to 부분
        ease: "none", // 쓸데없는 애니메이션 없애는 부분
        scrollTrigger: {
          // 스크롤 애니메이션 발생하는 부분
          trigger: triggerRef.current, // 스크롤이 발생되는 요소 위치
          start: "top top", // "요소위치 시작위치"
          end: "bottom center", // "요소위치 끝위치"
          scrub: 0.7, // 되감기 기능, 또한 스크롤을 부드러운 애니메이션 추가.
          pin: ".project-section", // 가로스크롤시 페이지를 고정할 수 있는 기능
        },
      }
    );
    return () => {
      pin.kill(); // 모든 애니메이션 중단
    };
  }, []);

  if (!images) {
    return null;
  }

  gsap.registerPlugin(ScrollTrigger); // ScrollTrigger시 필수

  return (
    <div className="tull">
      <section id="project" className="project">
        <motion.div ref={triggerRef} className="frame">
          {/* 여기서부터 Gsap 애니메이션 시작*/}
          <div ref={sectionRef} className="animation">
            {/* 여기 요소에서 ScrollTrigger 발생*/}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="image">
                {i}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Panoramatest;

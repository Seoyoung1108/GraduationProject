import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProject.scss";
import { useParams, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { invitationKey, kakaoKey } from "../keys/keys.js";
import kakaotalk from "../assets/icon_kakao.png";
import gmail from "../assets/icon_gmail.png";
import Modal from "react-modal";

const { Kakao } = window;

const PerMyInvitation = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");
  console.log(typeof myNickName);

  const { id } = useParams();
  const { state } = useLocation();
  const { isGroup } = state;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [file, setFile] = useState(null);

  const [inputWho, setInputWho] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const saveInputWho = (e) => {
    setInputWho(e.target.value);
  };
  const saveInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init(kakaoKey);
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());

    if (isGroup === 0) {
      axios
        .get(`/api/v1/exhibit/${id}/invitation`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setInputTitle(response.data.title);
          setInputIntroduction(response.data.introduction);
          setFile(response.data.thumbnail);
        });
    } else {
      axios
        .get(`/api/v1/group/groups/${id}/invitaion`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setInputTitle(response.data.name);
          setInputIntroduction(response.data.introduction);
          setFile(response.data.thumbnail);
        });
    }
  }, []);

  const sendKaKao = (e) => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: inputTitle,
        description: myNickName + "으로부터 온 초대장",
        imageUrl: file,
        link: {
          mobileWebUrl:
            isGroup === 0
              ? `http://13.208.139.6/arts/${inputTitle}/${id}`
              : `http://13.208.139.6/groups/${inputTitle}/${id}`,
        },
      },
      buttons: [
        {
          title: "전시회 보러가기",
          link: {
            mobileWebUrl:
              isGroup === 0
                ? `http://13.208.139.6/arts/${inputTitle}/${id}`
                : `http://13.208.139.6/groups/${inputTitle}/${id}`,
          },
        },
      ],
    });
    e.preventDefault();
  };

  const sendVerificationEmail = (e) => {
    // 이메일 보내기
    const templateParams = {
      to_email: inputEmail,
      from_name: myNickName,
      to_name: inputWho,
      title: inputTitle,
      introduction: inputIntroduction,
      image: file,
      link:
        isGroup === 0
          ? `http://13.208.139.6/arts/${inputTitle}/${id}`
          : `http://13.208.139.6/groups/${inputTitle}/${id}`,
    };

    emailjs
      .send(
        "JolvreInvitation", // 서비스 ID
        "JolvreExhibitInvitation", // 템플릿 ID
        templateParams,
        invitationKey // public-key
      )
      .then((response) => {
        document.location.href = "/mypage/myinvitation";
        alert("성공적으로 발송되었습니다.");
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
      });
    e.preventDefault();
  };

  const handleVerification = (e) => {
    sendVerificationEmail(e);
    //setModalIsOpen(false);
  };

  return (
    <>
      <div className="Diary">
        <div className="MyProject">
          <div className="Title">
            <div className="Letter">
              <h2>"{inputTitle}"의 초대장을 보냅니다.</h2>
            </div>
          </div>
          <div className="InviteContent">
            <div className="intro">{inputIntroduction}</div>
            <img src={file} />
          </div>

          <div className="InviteButtons">
            <div>
              <button className="invite" onClick={() => setModalIsOpen(true)}>
                <img className="gmail" src={gmail} />
              </button>
              <p>Gmail로 공유하기</p>
            </div>
            <div>
              <button className="invite" onClick={sendKaKao}>
                <img src={kakaotalk} />
              </button>
              <p>카카오톡으로 공유하기</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="Modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <form>
          <div className="InviteInfo">
            <div>
              <p>수신인 성함</p>
              <input
                id="id"
                type="text"
                value={inputWho}
                onChange={saveInputWho}
              />
            </div>
            <div>
              <p>수신인 이메일</p>
              <input
                id="renumber"
                type="text"
                placeholder="Gmail 계정을 입력해주세요."
                value={inputEmail}
                onChange={saveInputEmail}
              />
            </div>
          </div>
          <div className="sub">
            <button className="submit" onClick={handleVerification}>
              메일 보내기
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PerMyInvitation;

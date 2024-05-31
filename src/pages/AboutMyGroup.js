import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProject.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "react-modal";

const AboutMyGroup = () => {
  const accessToken = localStorage.getItem("accessToken");
  const myNickName = localStorage.getItem("myNickName");

  const { groupId } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputNickName, setInputNickName] = useState("");

  const [inputName, setInputName] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [inputPeriod, setInputPeriod] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [file, setFile] = useState(null);
  const [groupMembers, setGroupMembers] = useState(null);
  const [manager, setManager] = useState("");

  const saveInputNickName = (e) => {
    setInputNickName(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/group/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInputName(response.data.name);
        setInputProduct(response.data.selectedItem);
        setInputPeriod(response.data.period);
        setInputIntroduction(response.data.introduction);
        setFile(response.data.thumbnail);
      });

    axios
      .get(`/api/v1/group/groups/${groupId}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setGroupMembers(response.data.groupExhibitUserResponses);
        for (
          let i = 0;
          i < response.data.groupExhibitUserResponses.length;
          i++
        ) {
          if (response.data.groupExhibitUserResponses[i].role === "MANAGER") {
            setManager(
              response.data.groupExhibitUserResponses[i].userInfoResponse
                .nickname
            );
            break;
          }
        }
      });
  }, []);

  const onClick = () => {
    document.location.href = "/mypage/mygroup";
  };

  function onClickDelete(e) {
    if (window.confirm("단체 전시관을 삭제하시겠습니까?")) {
      // 확인 시
      axios
        .delete(`/api/v1/group/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          document.location.href = "/mypage/mygroup";
          alert("단체 전시관이 삭제되었습니다.");
        })
        .catch((error) => {});
    } else {
    }
    e.preventDefault();
  }

  function onClickOpen(e) {
    if (myNickName === manager) {
      setModalIsOpen(true);
    } else {
      alert("멤버 초대는 매니저만 가능합니다.");
    }
    e.preventDefault();
  }

  function onClickInvite(e) {
    fetch(`/api/v1/group/invite/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nickname: inputNickName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "User is not Found.") {
          alert(inputNickName + "님은 존재하지 않는 사용자입니다.");
        } else {
          setModalIsOpen(false);
          alert(inputNickName + "님을 초대하였습니다.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <>
      <div className="Diary">
        <div className="MyProject">
          <div className="Content">
            <form>
              <p>썸네일</p>
              <img className="see" src={file} />
              <div className="Bundle">
                <div>
                  <p>단체 전시관 이름</p>
                  <input
                    disabled={true}
                    id="id"
                    type="text"
                    value={inputName}
                  />
                </div>
              </div>
              <div className="Bundle">
                <div>
                  <p>상품 선택</p>
                  <input
                    id="phonenumber"
                    type="text"
                    value={inputProduct}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="Bundle">
                <div>
                  <p>개최 기간 선택</p>
                  <input
                    id="phonenumber"
                    type="text"
                    value={inputPeriod}
                    disabled={true}
                  />
                </div>
              </div>
              <p>전시관 소개</p>
              <textarea
                className="WriteContent"
                value={inputIntroduction}
                disabled={true}
              ></textarea>
            </form>
            <div className="Members">
              <p>멤버 초대</p>
              <div className="AboutMember">
                <div className="PlusMember" onClick={onClickOpen}>
                  <FiPlusCircle size={46} />
                </div>
                {groupMembers &&
                  groupMembers.map((members) => (
                    <div
                      className="PrevMembers"
                      members={members}
                      key={members.userInfoResponse.nickname}
                    >
                      {(() => {
                        if (members.userInfoResponse.imageUrl === null) {
                          return <IoPersonCircleOutline size={45} />;
                        } else {
                          return (
                            <img src={members.userInfoResponse.imageUrl} />
                          );
                        }
                      })()}
                      {members.userInfoResponse.nickname + "님"}
                      {members.userInfoResponse.nickname === manager
                        ? "(매니저)"
                        : ""}
                    </div>
                  ))}
              </div>
            </div>
            <div className="Line"></div>
            <div className="Buttons">
              {(() => {
                if (myNickName === manager) {
                  return (
                    <>
                      <Link to={`/mypage/mygroup/${groupId}/update`}>
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
                    </>
                  );
                }
              })()}

              <button className="SubButtons" onClick={onClick}>
                목록
              </button>
            </div>
            <Link
              to={`/mypage/mygroup/${groupId}/upload`}
              state={{ name: inputName }}
            >
              <button className="gotoDiary">{">> 프로젝트 추가"}</button>
            </Link>
          </div>
          <div className="call">
            * 단체 전시관 수정 및 삭제와 멤버 초대는 전시관을 생성한 매니저만
            가능합니다.
          </div>
        </div>
      </div>
      <Modal
        className="InviteModal"
        style={{ width: "200px" }}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <form onSubmit={onClickInvite}>
          <div>
            <p>초대할 멤버의 닉네임을 입력해주세요.</p>
            <input
              id="id"
              type="text"
              value={inputNickName}
              onChange={saveInputNickName}
            />
          </div>
          <div className="sub">
            <button className="submit" type="submit">
              초대하기
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AboutMyGroup;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MyProject.scss";
import { useParams } from "react-router-dom";

const UpdateMyGroup = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { groupId } = useParams();

  const [prevImage, setPrevImage] = useState(null);

  const [inputName, setInputName] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [inputPeriod, setInputPeriod] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [file, setFile] = useState(null);

  const saveInputName = (e) => {
    setInputName(e.target.value);
  };
  const saveInputIntroduction = (e) => {
    setInputIntroduction(e.target.value);
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
        setPrevImage(response.data.thumbnail);
      });
  }, []);

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

  function onClickUpdate(e) {
    const formData = new FormData();

    if (file !== null) {
      formData.append("thumbnail", file);
    }
    formData.append("name", inputName);
    formData.append("introduction", inputIntroduction);

    fetch(`/api/v1/group/groups/${groupId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = `/mypage/mygroup/${groupId}`;
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
            <p>썸네일</p>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={onChangeFile}
            />
            <img className="see" src={prevImage} />
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
                (* 개최 기간 종료 후에는 지난 전시회로 분류됩니다.)
              </div>
            </div>
            <p>전시관 소개</p>
            <textarea
              className="WriteContent"
              value={inputIntroduction}
              onChange={saveInputIntroduction}
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

export default UpdateMyGroup;

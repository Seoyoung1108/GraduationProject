import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./KakaoLogin.css";

function KakaoLogin() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log("KAKAO_CODE:", KAKAO_CODE);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log("getAccessToken 호출");

    /*
    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await axios.post(
        "~~~/api/auth/kakao",
        {
          authorizationCode: KAKAO_CODE,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.data.accessToken;
      console.log("accessToken:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      //localStorage.setItem("refreshToken", response.refreshToken);
      setToken(accessToken);

      setAccessTokenFetching(false); // Reset fetching to false
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
    */
  };

  useEffect(() => {
    if (KAKAO_CODE && token === null) {
      getAccessToken();
    }
  }, [KAKAO_CODE, token]);

  return <div>Loading...</div>;
}

export default KakaoLogin;

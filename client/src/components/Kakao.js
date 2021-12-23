import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Kakao = ({ LoginHanlder }) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code : ", code);
  const JS_APP_KEY = "bd12c73060a887fc88d9a3626ae95754";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const makeFormData = (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      searchParams.append(key, params[key]);
    });

    return searchParams;
  };

  axios({
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    url: "https://kauth.kakao.com/oauth/token",
    data: makeFormData({
      grant_type: "authorization_code",
      client_id: JS_APP_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    }),
  }).then((res) => {
    console.log("res : ", res);
    console.log("res.data : ", res.data);
    const ACCESS_TOKEN = res.data.access_token;
    console.log(ACCESS_TOKEN);
    sendKakaoTokenToServer(ACCESS_TOKEN);
  });

  const sendKakaoTokenToServer = (token) => {
    console.log("여기로오나?");
    // console.log(token);
    axios
      .post("http://localhost:4000/oauth/kakao", { access_token: token })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          const user = res.data;
          console.log("user : ", user);
          // window.localStorage.setItem(
          //   "token",
          //   JSON.stringify({
          //     access_token: res.data.jwt,
          //   })
          // );
          // user.data.id,
          // user.data.properties.nickname
          // user.data.kakao_account.email
          const userInfo = {
            id: user.data.id,
            nickname: user.data.properties.nickname,
            email: user.data.kakao_account.email,
          };
          LoginHanlder(userInfo);
          navigate("/");
        } else {
          window.alert("로그인에 실패하였습니다.");
        }
      });
  };
  return <></>;
};

export default Kakao;

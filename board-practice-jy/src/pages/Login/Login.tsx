import { useEffect, useRef } from "react";
import * as S from "./Login.style";
import { useMutation } from "@tanstack/react-query";
import BoardAPI, { LoginReq } from "@apis/boardApi";
import { getCookie, setCookie } from "@apis/cookie";
import { useNavigate } from "react-router-dom";
import authStore from "@stores/authStore";

const Login = () => {
  const loginEmail = useRef("");
  const loginPw = useRef("");
  const navigate = useNavigate();
  const { setUserInfoList } = authStore();
  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    console.log(loginEmail.current);
    console.log(loginPw.current);
    loginMutate({ email: loginEmail.current, password: loginPw.current });
  };

  const { mutate: loginMutate } = useMutation({
    mutationFn: (body: LoginReq) => BoardAPI.postLogin(body),
    onSuccess: (data) => {
      console.log(data);
      if (data.access_token) {
        setCookie("token", data.access_token, {
          path: "/",
          sameSite: "strict",
        });
        setUserInfoList(data.user);
        navigate("/");
      }
    },
    onError: (error) => console.log("error", error),
  });

  return (
    <S.LoginWrap>
      <h1>로그인</h1>
      <S.LoginContainer>
        <S.LoginList>
          <li>
            <label htmlFor="">ID(이메일)</label>
            <input
              type="email"
              onChange={(e) => {
                loginEmail.current = e.currentTarget.value;
              }}
              placeholder="이메일을 입력해주세요"
            />
          </li>
          <li>
            <label htmlFor="">비밀번호</label>
            <input
              type="text"
              onChange={(e) => {
                loginPw.current = e.currentTarget.value;
              }}
              placeholder="비밀번호를 입력해주세요"
            />
          </li>
        </S.LoginList>
        <S.LoginBtn onClick={handleLogin}>로그인</S.LoginBtn>
        <S.LinkBox>
          <S.LinkTo to="/signup">회원가입 페이지로</S.LinkTo>
        </S.LinkBox>
      </S.LoginContainer>
    </S.LoginWrap>
  );
};

export default Login;

import { useRef } from "react";
import * as S from "./Login.style";
import { useMutation } from "@tanstack/react-query";
import BoardAPI, { LoginReq } from "@apis/boardApi";

const Login = () => {
  const loginEmail = useRef("");
  const loginPw = useRef("");

  const handleLogin = () => {
    console.log(loginEmail.current);
    console.log(loginPw.current);
    loginMutate({ email: loginEmail.current, password: loginPw.current });
  };

  const { mutate: loginMutate } = useMutation({
    mutationFn: (body: LoginReq) => BoardAPI.postLogin(body),
    onSuccess: (data) => {
      console.log(data);
      // 데이터에 access token 은 cookie 에 저장
      // 데이터 유저는 zustand에 저장
    },
    onError: (error) => console.log("error", error),
  });

  return (
    <div>
      <h1>로그인</h1>
      <div>
        <ul>
          <li>
            <label htmlFor="">ID(이메일)</label>
            <input
              type="email"
              onChange={(e) => {
                loginEmail.current = e.currentTarget.value;
              }}
            />
          </li>
          <li>
            <label htmlFor="">비밀번호</label>
            <input
              type="text"
              onChange={(e) => {
                loginPw.current = e.currentTarget.value;
              }}
            />
          </li>
        </ul>
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
};

export default Login;

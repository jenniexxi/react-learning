import { SubmitHandler, useForm } from "react-hook-form";
import * as S from "./Signup.style";
import BoardAPI, { SignupReq } from "@apis/boardApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Input = SignupReq & {
  pwConfirm: string;
};

const Signup = () => {
  // const { register } = useForm({ mode: "onBlur" });
  const [isValidateBtn, setIsValidateBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Input>({ mode: "onBlur" });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (data.password !== data.pwConfirm) {
      setError("password", {
        type: "custom",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    const newData = {
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
    };
    registerMutate(newData);
  };

  const { mutate: registerMutate } = useMutation({
    mutationFn: (body: SignupReq) => BoardAPI.createSignUp(body),
    onSuccess: () => navigate("/login"),
  });

  const { mutate: emailChkMutate } = useMutation({
    mutationFn: () => BoardAPI.getChkEmail(watch("email")),
    onSuccess: (data) => {
      setIsValidateBtn(data.available);
      setError("email", { type: "custom", message: data.message });
      console.log(data)
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <label htmlFor="">이메일</label>
            <input
              type="text"
              {...register("email", {
                pattern: {
                  value:
                    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                  message: "이메일 형식에 맞게 입력해주세요",
                },
                required: {
                  value: true,
                  message: "이메일을 적어주세요.",
                },
              })}
              placeholder="이메일을 입력해주세요"
            />
            <button onClick={() => emailChkMutate()}>중복 체크</button>
            <p>{errors?.email?.message}</p>
          </li>
          <li>
            <label htmlFor="">비밀번호</label>
            <input
              type="text"
              {...register("password", {
                pattern: {
                  value: /^[A-Za-z0-9]{6,}$/,
                  message: "가능한 문자: 영문 대소문자, 6자 이상 입력해주세요",
                },
                minLength: 6,
                required: {
                  value: true,
                  message: "비밀번호를 입력해주세요.",
                },
              })}
              placeholder="비밀번호를 입력해주세요"
            />
            <p>{errors?.password?.message}</p>
          </li>
          <li>
            <label htmlFor="">비밀번호 확인</label>
            <input
              type="text"
              {...register("pwConfirm", {
                pattern: {
                  value: /^[A-Za-z0-9]{6,}$/,
                  message: "가능한 문자: 영문 대소문자, 6자 이상 입력해주세요",
                },
                minLength: 6,
                required: {
                  value: true,
                  message: "비밀번호를 입력해주세요.",
                },
              })}
              placeholder="비밀번호를 입력해주세요"
            />
            <p>{errors?.pwConfirm?.message}</p>
          </li>
          <li>
            <label htmlFor="">이름</label>
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "이름을 입력해주세요.",
                },
              })}
              placeholder="이름을 입력해주세요"
            />
          </li>
          <li>
            <label htmlFor="">별명</label>
            <input
              type="text"
              {...register("username", {
                required: {
                  value: true,
                  message: "별명을 입력해주세요.",
                },
              })}
              placeholder="별명을 입력해주세요"
            />
          </li>
        </ul>
        <button type="submit" disabled={!isValidateBtn}>
          확인
        </button>
      </form>
      <div>
        <button>로그인 페이지로 이동</button>
      </div>
    </div>
  );
};

export default Signup;

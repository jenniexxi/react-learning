import { SubmitHandler, useForm } from "react-hook-form";
import * as S from "./Signup.style";
import BoardAPI, { SignupReq } from "@apis/boardApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
    mutationFn: () => {
      // BoardAPI.getChkEmail(watch("email"));
      const email = watch("email");

      if (!email) {
        setError("email", { type: "custom" });
        return Promise.reject("이메일이 비어있습니다.");
      }

      return BoardAPI.getChkEmail(email);
    },
    onSuccess: (data) => {
      setIsValidateBtn(data.available);
      setError("email", { type: "custom", message: data.message });
      console.log(data);
    },
    onError: (error) => {
      console.error("API 요청 중 오류 발생:", error);
    },
  });

  return (
    <S.SignupWrap>
      <h1>회원가입</h1>
      <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
        <S.SignupList>
          <li>
            <label htmlFor="">이메일</label>
            <S.EmailInput
              type="text"
              {...register("email", {
                pattern: {
                  value:
                    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                  message: "이메일 형식에 맞게 입력해주세요",
                },
                required: {
                  value: true,
                  message: "이메일을 입력해주세요.",
                },
              })}
              placeholder="이메일을 입력해주세요"
            />
            <S.ChkBtn onClick={() => emailChkMutate()}>중복 체크</S.ChkBtn>
            <S.ErrorText>{errors?.email?.message}</S.ErrorText>
          </li>
          <li>
            <label htmlFor="">비밀번호</label>
            <S.CommInput
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
            <S.ErrorText>{errors?.password?.message}</S.ErrorText>
          </li>
          <li>
            <label htmlFor="">비밀번호 확인</label>
            <S.CommInput
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
            <S.ErrorText>{errors?.pwConfirm?.message}</S.ErrorText>
          </li>
          <li>
            <label htmlFor="">이름</label>
            <S.CommInput
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
            <S.CommInput
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
        </S.SignupList>
        <S.SignupBtn type="submit" disabled={!isValidateBtn}>
          확인
        </S.SignupBtn>
      </S.SignupForm>
      <S.LinkBox>
        <S.LinkTo to="/login">로그인 페이지로</S.LinkTo>
      </S.LinkBox>
    </S.SignupWrap>
  );
};

export default Signup;

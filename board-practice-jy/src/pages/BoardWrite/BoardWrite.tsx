import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./BoardWrite.style";
import { SubmitHandler, useForm } from "react-hook-form";
import BoardAPI, { detailPostResp, postInfo } from "@apis/boardApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type ModifyState = { postDetailData: detailPostResp };

const BoardWrite = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<postInfo>();
  const navigate = useNavigate();
  const { pathname, state }: { pathname: string; state: ModifyState } =
    useLocation();
  const [isWriteMode, setIsWriteMode] = useState<boolean>(true);

  useEffect(() => {
    if (pathname === "/write") {
      setIsWriteMode(true);
    } else {
      setIsWriteMode(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isWriteMode) {
      setValue("title", state.postDetailData.title);
      setValue("content", state.postDetailData.content);
    }
  }, [isWriteMode]);
  console.log(state.postDetailData);
  const { mutate: writeMutate } = useMutation({
    mutationFn: (body: postInfo) => BoardAPI.createPost(body),
    onSuccess: () => {
      navigate("/");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: postInfo }) =>
      BoardAPI.updatePost(id, body),
    onSuccess: (_resp, value) => {
      navigate(`/detail/${value.id}`);
    },
  });

  const onSubmit: SubmitHandler<postInfo> = (data) => {
    console.log(data);

    if (isWriteMode) {
      writeMutate(data);
    } else {
      updateMutate({ id: state.postDetailData.id.toString(), body: data });
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate("/");
  };

  return (
    <S.WriteWrap>
      <S.ContsContainer>
        <h1>{isWriteMode ? "글쓰기" : "수정하기"}</h1>
        <S.ContsBox onSubmit={handleSubmit(onSubmit)}>
          <S.BtnBox>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
            <button type="submit">확인</button>
          </S.BtnBox>
          <S.TextBox>
            <S.WriteTitle>제목 :</S.WriteTitle>
            <input
              type="text"
              {...register("title", {
                required: "필수값입니다.",
                maxLength: 100,
              })}
            />
            <S.TextError>{errors.title?.message}</S.TextError>
          </S.TextBox>
          <S.TextBox>
            <S.WriteTitle>내용 : </S.WriteTitle>
            <textarea
              {...register("content", {
                required: "필수값입니다.",
                minLength: { value: 10, message: "10자 이상 적어주세요." },
              })}
            ></textarea>
            <S.TextError>{errors.title?.message}</S.TextError>
          </S.TextBox>
        </S.ContsBox>
      </S.ContsContainer>
    </S.WriteWrap>
  );
};

export default BoardWrite;

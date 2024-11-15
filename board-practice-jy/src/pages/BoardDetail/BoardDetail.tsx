import { useQuery } from "@tanstack/react-query";
import * as S from "./BoardDetail.style";
import BoardAPI from "@apis/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import authStore from "@stores/authStore";

const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userInfo } = authStore();
  console.log("id:", id);

  const {
    data: postDetailData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postDetailLists", id],
    queryFn: () =>
      id ? BoardAPI.getDetail(id) : Promise.reject("id가 없습니다."),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

  console.log("Post Detail Data:", postDetailData);

  const handleUpdate = () => {
    navigate(`/modify`, { state: { postDetailData } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>실패</div>;

  return (
    <S.DetailWrap>
      <S.ContsContainer>
        <h1>{postDetailData?.title}</h1>
        {/* 내가 쓴 글에서만 수정, 삭제 버튼 노출 */}
        {userInfo?.id === postDetailData?.user.id && (
          <S.BtnBox>
            <button onClick={handleUpdate}>수정</button>
            <button>삭제</button>
          </S.BtnBox>
        )}

        <S.ContsBox>
          <div>글 번호: {postDetailData?.id}</div>
          <div>
            작성일:{" "}
            {dayjs(postDetailData?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div>조회수: {postDetailData?.views || "0"}</div>
          <div>추천수: {postDetailData?.likes || "0"}</div>
          <div>내용 : {postDetailData?.content}</div>
          <div>댓글 목록</div>
          {postDetailData?.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <div>{comment.user.username}</div>
            </div>
          ))}
        </S.ContsBox>
        <S.BtmBox>
          <button>추천하기</button>
          <button>목록</button>
        </S.BtmBox>
      </S.ContsContainer>
    </S.DetailWrap>
  );
};

export default BoardDetail;

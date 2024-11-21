import { useMutation, useQuery } from "@tanstack/react-query";
import * as S from "./BoardDetail.style";
import BoardAPI from "@apis/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import authStore from "@stores/authStore";
import { useState } from "react";

const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userInfo } = authStore();
  console.log("id:", id);
  // const [isValidLike, setIsValidLike] = useState(false);
  // const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const {
    data: postDetailData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["postDetailLists", id],
    queryFn: () => {
      return BoardAPI.getDetail(id!);
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => BoardAPI.deletePost(id),
    onSuccess: () => {
      navigate("/");
    },
  });

  const { mutate: likesMutate } = useMutation({
    mutationFn: (id: string) => BoardAPI.likesPost(id),
    onSuccess: () => refetch(),
    // === 아래거로 쓸 수도 있음
    // queryClient.invalidateQueries({ queryKey: ["postDetailLists", id] }),
  });

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: (comment: { id: string; content: string }) =>
      BoardAPI.createComment(comment.id, comment.content),
    onSuccess: () => {
      refetch();
      setNewComment("");
    },
  });

  const handleUpdate = () => {
    navigate(`/modify`, { state: { postDetailData } });
  };

  const handleLiked = () => {
    if (id) {
      // setIsValidLike(!isValidLike);
      likesMutate(id);
    }
  };

  const handleList = () => {
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?")) {
      deleteMutate(id!);
    }
  };

  const handleCreateComments = () => {
    if (newComment.trim() && id) {
      createCommentMutate({ id, content: newComment });
    }
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
            <button onClick={handleDelete}>삭제</button>
          </S.BtnBox>
        )}

        <S.ContsBox>
          <div>글 번호: {postDetailData?.id}</div>
          <div>
            작성일:{" "}
            {dayjs(postDetailData?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div>조회수: {postDetailData?.views || "0"}</div>
          <div>추천수: {postDetailData?.likes || "0"}</div>
          <div>내용 : {postDetailData?.content}</div>
          <S.CommentTitle>댓글 목록</S.CommentTitle>
          <S.CommentBox>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCreateComments}>등록</button>
          </S.CommentBox>
          {postDetailData?.comments.map((comment) => (
            <S.CommentList>
              <S.CommentItem key={comment.id}>
                <p>{comment.content}</p>
                <div>{comment.user.email}</div>
              </S.CommentItem>
            </S.CommentList>
          ))}
        </S.ContsBox>
        <S.BtmBox>
          <button onClick={handleLiked}>추천하기</button>
          <button onClick={handleList}>목록</button>
          <S.CountNum>추천하기 카운트 : {postDetailData?.likes}</S.CountNum>
        </S.BtmBox>
      </S.ContsContainer>
    </S.DetailWrap>
  );
};

export default BoardDetail;

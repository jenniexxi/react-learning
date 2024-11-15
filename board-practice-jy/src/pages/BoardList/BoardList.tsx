import { useState } from "react";
import * as S from "./BoardList.style";
import BoardAPI from "@apis/boardApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BoardList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: boardListData, refetch } = useQuery({
    queryKey: ["getBoardLists", page],
    queryFn: () =>
      BoardAPI.getBoardList({ page, limit: 10, search, searchType }),
  });

  const onClickSearch = () => {
    setPage(1);
    queryClient.invalidateQueries({
      queryKey: ["getBoardLists", 1],
    });
    refetch();
  };

  const handleToLinks = () => {
    navigate("/write");
  };

  const handleToDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <S.BoardWrap>
      <S.CategoryContainer>
        <S.Category>
          <S.SelectTitle>카테고리</S.SelectTitle>
          <S.SelectBox
            name="category"
            id="category"
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </S.SelectBox>
        </S.Category>
        <S.SearchBox>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={onClickSearch}>검색</button>
        </S.SearchBox>
      </S.CategoryContainer>
      <S.TableContainer>
        <S.NewBtnBox>
          <button onClick={handleToLinks}>신규 작성</button>
        </S.NewBtnBox>
        <S.BoardTable>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>
            {boardListData?.posts.map((item) => {
              return (
                <tr key={item.id} onClick={() => handleToDetail(item.id)}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.user.username}</td>
                  <td>{dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                  <td>{item.views}</td>
                  <td>{item.likes}</td>
                </tr>
              );
            })}
          </tbody>
        </S.BoardTable>
      </S.TableContainer>
      <S.PagingContainer>
        <S.BtnFirst>&lt;&lt;</S.BtnFirst>
        <S.BtnPrev>&lt;</S.BtnPrev>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <S.BtnNext>&gt;</S.BtnNext>
        <S.BtnEnd>&gt;&gt;</S.BtnEnd>
      </S.PagingContainer>
    </S.BoardWrap>
  );
};

export default BoardList;

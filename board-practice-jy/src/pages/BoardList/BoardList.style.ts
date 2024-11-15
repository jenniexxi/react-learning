import styled from "styled-components";

export const BoardWrap = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 10px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const SelectTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

export const SelectBox = styled.select`
  width: 200px;
  height: 32px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 200px;
    height: 32px;
    padding-left: 6px;
  }
  button {
    width: 60px;
    height: 32px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    background-color: #407df7;
  }
`;

export const NewBtnBox = styled.div`
  margin: 10px auto 0;
  text-align: right;
  button {
    height: 32px;
    padding: 0 15px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    background-color: #407df7;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const BoardTable = styled.table`
  width: 100%;
  margin: 10px auto 30px;
  border: 1px solid #aaa;
  thead {
    background-color: #e8e8e8;
    tr {
      th {
        height: 30px;
        font-size: 14px;
        border-right: 1px solid #aaa;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 10px 5px;
        font-size: 14px;
        text-align: center;
        border-top: 1px solid #aaa;
      }
    }
  }
`;

export const PagingContainer = styled.div`
  text-align: center;
`;

export const BtnFirst = styled.button``;

export const BtnPrev = styled.button``;

export const BtnNext = styled.button``;

export const BtnEnd = styled.button``;

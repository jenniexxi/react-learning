import styled from "styled-components";

export const DetailWrap = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 10px;
`;

export const ContsContainer = styled.div`
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const BtnBox = styled.div`
  text-align: right;
  button {
    width: 52px;
    height: 32px;
    border-radius: 3px;
    font-size: 14px;
    &:first-child {
      margin-right: 6px;
      color: #407df7;
      border: 1px solid #407df7;
    }
    &:nth-child(2) {
      color: #fff;
      background-color: #407df7;
    }
  }
`;

export const ContsBox = styled.div`
  div {
    font-size: 14px;
  }
`;

export const BtmBox = styled(BtnBox)`
  text-align: left;
  margin-top: 50px;
  button {
    padding: 0 14px;
    width: auto;
  }
`;

export const CountNum = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export const CommentTitle = styled.div`
  margin: 30px 0 10px;
`;

export const CommentBox = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 400px;
    height: 32px;
    padding-left: 4px;
  }
  button {
    width: 52px;
    height: 32px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    background-color: #407df7;
  }
`;

export const CommentList = styled.ul`
  margin-top: 15px;
`;
 
export const CommentItem = styled.li`
  margin-bottom: 10px;
  p {
    font-size: 14px;
  }
  div {
    font-size: 13px;
  }
`;
 
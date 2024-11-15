import styled from "styled-components";

export const WriteWrap = styled.div`
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
    &:last-child {
      color: #fff;
      background-color: #407df7;
    }
  }
`;

export const ContsBox = styled.form`
  margin: 30px auto;
  div {
    font-size: 14px;
  }
`;

export const TextBox = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 36px;
    border: 1px solid #ddd;
    padding: 0 10px;
  }
  textarea {
    width: 100%;
    height: 300px;
    border: 1px solid #ddd;
    padding: 10px;
  }
`;

export const WriteTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TextError = styled.p`
  font-size: 14px;
  color: #ff7b00;
  margin-top: 5px;
`;

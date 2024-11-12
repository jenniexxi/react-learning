import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignupWrap = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 30px 0;
  h1 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const SignupForm = styled.form``;

export const SignupList = styled.ul`
  li {
    margin-bottom: 20px;
    label {
      display: block;
      font-size: 16px;
      margin-bottom: 5px;
    }
    input {
      height: 36px;
      border: 1px solid #ddd;
      padding-left: 6px;
      border-radius: 4px;
    }
  }
`;

export const CommInput = styled.input`
  width: 100%;
`;

export const EmailInput = styled.input`
  width: calc(100% - 80px);
`;

export const ChkBtn = styled.button`
  width: 70px;
  height: 36px;
  background-color: #aaa;
  border-radius: 6px;
  color: #fff;
  margin-left: 10px;
`;

export const SignupBtn = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 10px;
  background-color: #407df7;
  color: #fff;
  font-size: 16px;
`;

export const LinkBox = styled.div`
  text-align: right;
  margin-top: 16px;
`;

export const LinkTo = styled(Link)`
  font-size: 16px;
  text-decoration: underline;
  color: #a1a1a1;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #ff7b00;
  margin-top: 4px;
`;

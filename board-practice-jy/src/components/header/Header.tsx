import authStore from "@stores/authStore";
import * as S from "./Header.style";
import { useEffect } from "react";
import BoardAPI from "@apis/boardApi";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@apis/cookie";

const Header = () => {
  const { userInfo, setUserInfoList, logout } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    BoardAPI.getUserProfile()
      .then((resp) => {
        setUserInfoList(resp);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    removeCookie("token");
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWrap>
        <S.Title>LOGO</S.Title>
        <S.HeaderBox>
          {userInfo ? (
            <>
              <S.LoginInfoTItle>{userInfo.email}</S.LoginInfoTItle>
              <S.HBtn onClick={handleLogout}>로그아웃</S.HBtn>
            </>
          ) : (
            <S.HBtn onClick={() => navigate("/login")}>로그인</S.HBtn>
          )}
        </S.HeaderBox>
      </S.HeaderWrap>
    </S.HeaderContainer>
  );
};

export default Header;

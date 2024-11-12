import { SignupResp } from "@apis/boardApi";
import { create } from "zustand";

// 변수 타입 정의
export type State = {
  userInfo: SignupResp | undefined;
};

// 함수 타입 정의
export type Actions = {
  setUserInfoList: (userInfoList: SignupResp | undefined) => void;
  logout: () => void;
};

const authStore = create<State & Actions>((set) => ({
  userInfo: undefined,
  setUserInfoList: (userInfoList) => set({ userInfo: userInfoList }),
  logout: () => set({ userInfo: undefined }),
}));

export default authStore;

// import { axiosInstance } from "@apis/urls";

// type BoardList = {};
// const BoardAPI = {
//   getBoardList: (): Promise<BoardList> => {
//     return axiosInstance
//       .post(BoardUrl.getList, { category: "1", tab: "2" })
//       .then((resp) => resp.data)
//       .catch((e) => e);
//   },
// };

// export default BoardAPI;

import { axiosInstance } from "./api";
import { Url } from "./urls";

export type SignupReq = {
  email: string;
  username: string;
  password: string;
  name: string;
};

export type SignupResp = {
  id: number;
  email: string;
  username: string;
  name: string;
  createdAt: string;
};

export type ChkEmailResp = {
  available: boolean;
  message: string;
};

export type LoginReq = {
  email: string;
  password: string;
};

export type LoginResp = {
  access_token: string;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    createdAt: string;
  };
}[];

const BoardAPI = {
  createSignUp: (body: SignupReq): Promise<SignupResp> => {
    return axiosInstance
      .post(Url.createSignup, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("API Error:", e);
        throw e;
      });
  },
  getChkEmail: (email: string): Promise<ChkEmailResp> => {
    return axiosInstance
      .get(Url.getChkEmail(email))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("API Error:", e);
        throw e;
      });
  },
  postLogin: (body: LoginReq): Promise<LoginResp> => {
    return axiosInstance
      .post(Url.postLogin, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("API Error:", e);
        throw e;
      });
  },
};

export default BoardAPI;

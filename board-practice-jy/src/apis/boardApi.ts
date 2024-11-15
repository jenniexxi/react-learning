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
  user: SignupResp;
};

export type BoardListReq = {
  page: number;
  limit: number;
  search?: string;
  searchType?: string;
};

export type BoardListResp = {
  posts: {
    id: number;
    title: string;
    content: string;
    views: number;
    likes: number;
    user: {
      id: number;
      email: string;
      username: string;
      name: string;
      createdAt: string;
    };
    comments: [
      {
        id: number;
        content: string;
        user: {
          id: number;
          email: string;
          username: string;
          name: string;
          createdAt: string;
        };
        createdAt: string;
        updatedAt: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
};

export type postInfo = {
  title: string;
  content: string;
};

export type postInfoResp = {
  id: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    createdAt: string;
  };
  comments: {
    id: number;
    content: string;
    user: {
      id: number;
      email: string;
      username: string;
      name: string;
      createdAt: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type detailPostResp = {
  id: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    createdAt: string;
  };
  comments: {
    id: number;
    content: string;
    user: {
      id: number;
      email: string;
      username: string;
      name: string;
      createdAt: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

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
  getUserProfile: (): Promise<SignupResp> => {
    return axiosInstance
      .get(Url.getUserProfile)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("API Error:", e);
        throw e;
      });
  },
  getBoardList: ({
    page,
    limit,
    search = "",
    searchType = "",
  }: BoardListReq): Promise<BoardListResp> => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search,
      searchType: searchType,
    });

    return axiosInstance
      .get(Url.getBoardList + "?" + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("API Error:", e);
        throw e;
      });
  },
  createPost: (body: postInfo): Promise<postInfoResp> => {
    return axiosInstance
      .post(Url.createPost, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("create board API Error:", e);
        throw e;
      });
  },
  getDetail: (id: string): Promise<detailPostResp> => {
    return axiosInstance
      .get(Url.getDetail(id))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("detailPage API Error:", e);
        throw e;
      });
  },
  updatePost: (id: string, body: postInfo): Promise<detailPostResp> => {
    const url = Url.updatePost(id);

    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("updatePost API Error:", e);
        throw e;
      });
  },
};

export default BoardAPI;

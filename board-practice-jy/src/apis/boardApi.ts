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

export type CommentsInfo = {
  id: number;
  content: string;
  user: SignupResp;
  createdAt: string;
  updatedAt: string;
};

export type BoardListResp = {
  posts: postInfoResp[];
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
  user: SignupResp;
  comments: CommentsInfo[];
  createdAt: string;
  updatedAt: string;
};

export type commentsResp = {
  id: number;
  content: string;
  user: SignupResp;
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
  getDetail: (id: string): Promise<postInfoResp> => {
    return axiosInstance
      .get(Url.getDetail(id))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("detailPage API Error:", e);
        throw e;
      });
  },
  updatePost: (id: string, body: postInfo): Promise<postInfoResp> => {
    const url = Url.updatePost(id);

    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("updatePost API Error:", e);
        throw e;
      });
  },
  deletePost: (id: string): Promise<void> => {
    const url = Url.deletePost(id);

    return axiosInstance
      .delete(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("deletePost API Error:", e);
        throw e;
      });
  },
  likesPost: (id: string): Promise<postInfoResp> => {
    const url = Url.likesPost(id);

    return axiosInstance
      .post(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("likesPost API Error:", e);
        throw e;
      });
  },
  createComment: (id: string, content: string): Promise<commentsResp> => {
    const url = Url.createComment(id);

    return axiosInstance
      .post(url, { content })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error("likesPost API Error:", e);
        throw e;
      });
  },
};

export default BoardAPI;

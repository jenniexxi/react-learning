export const Url = {
  createSignup: "/auth/register",
  getChkEmail: (email: string) => `/users/check-email/${email}`,
  postLogin: "/auth/login",
  getUserProfile: "auth/profile",
  getBoardList: "/board/posts",
  createPost: "/board/posts",
  getDetail: (id: string) => `/board/posts/${id}`,
  updatePost: (id: string) => `/board/posts/${id}`,
  deletePost: (id: string) => `/board/posts/${id}`,
};

export const Url = {
  createSignup: "/auth/register",
  getChkEmail: (email: string) => `/users/check-email/${email}`,
  postLogin: "/auth/login",
  getUserProfile: "auth/profile",
};

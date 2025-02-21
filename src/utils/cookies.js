import Cookies from "js-cookie";

export const setCookies = (token, user) => {
  Cookies.set("token", token, { expires: 7, secure: true }),
    Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
};

export const getToken = () => Cookies.get("token") || null;

export const getUser = () =>
  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const clearCookies = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

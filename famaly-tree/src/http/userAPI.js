import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth", {}).catch((e) => {
    if (e.response.data.message === "Не авторизован") {
      return { data: { token: undefined } };
    }
  });
  if (data.token) {
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  }
  return Error("Не авторизован");
};

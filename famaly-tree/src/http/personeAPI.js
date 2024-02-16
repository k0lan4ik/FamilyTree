import { $authHost, $host } from ".";
import { checkId } from "../routes";

export const createPersone = async (persone) => {
  const { data } = await $authHost.post("api/persone", persone);
  return data;
};

export const fetchPersones = async () => {
  const { data } = await $host.get("api/persone");
  localStorage.setItem("token", data.token);
  return data;
};

export const fetchPersonesForTree = async (user) => {
  console.log(user);
  const { data } = await $host.get("api/persone?user=" + user);
  localStorage.setItem("token", data.token);
  return data;
};

export const fetchOnePersone = async (id) => {
  const { data } = await $host.get("api/persone/" + id);
  localStorage.setItem("token", data.token);
  return data;
};

export const setImage = async (id, file) => {
  const formData = new FormData();
  formData.append("img", file);
  const { data } = await $authHost.post("api/persone/img/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const changeOnePersone = async (id, persone) => {
  const { data } = await $authHost.post("api/persone/change/" + id, persone);
  return data;
};

export const deletePersone = async (id) => {
  const { data } = await $authHost.post("api/persone/delete/" + id);
  return data;
};

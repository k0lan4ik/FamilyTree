import { $authHost, $host } from ".";

export const createDescription = async (info) => {
  const { data } = await $authHost.post("api/persone/info/", info);
  return data;
};

export const fetchDescriptions = async (personeId) => {
  console.log(personeId);
  const { data } = await $host.get("api/persone/info/", { personeId });

  localStorage.setItem("token", data.token);
  return data;
};

export const changeOneDescription = async (id, info) => {
  const { data } = await $authHost.post("api/persone/info/change/" + id, info);
  return data;
};

export const deleteOneDescriptoin = async (id) => {
  const { data } = await $authHost.post("api/persone/info/delete/" + id);
  return data;
};
export const deleteAllDescriptoin = async (id) => {
  const { data } = await $authHost.post("api/persone/info/delete/", { id });
  return data;
};

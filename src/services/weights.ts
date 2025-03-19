import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const pingUrl = import.meta.env.VITE_API_PING_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface Weight {
  weight: number;
  id: string;
}

const getAll = () => {
  return axios.get(baseUrl, { headers: getAuthHeader() });
};

const pingServer = () => {
  return axios
    .get(pingUrl)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return console.error("Failed to ping server", error);
    });
};

const create = (newObject: Omit<Weight, "id">) => {
  return axios.post(baseUrl, newObject, { headers: getAuthHeader() });
};

const deleteWeight = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: getAuthHeader() });
};

const updateById = (id: string, newWeight: number) => {
  return axios.put(
    `${baseUrl}/${id}`,
    { weight: newWeight },
    { headers: getAuthHeader() }
  );
};

export default {
  getAll,
  pingServer,
  create,
  deleteWeight,
  updateById,
};

import axios from "axios";

const baseUrl = "/api/weights";

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
  create,
  deleteWeight,
  updateById,
};

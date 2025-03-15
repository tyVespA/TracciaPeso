import axios from "axios";
const baseUrl = "/api/weights";

interface Weight {
  weight: number;
  id: number;
}

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject: Omit<Weight, "id">) => {
  return axios.post(baseUrl, newObject);
};

const deleteWeight = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateById = (id: string, newWeight: number) => {
  return axios.put(`${baseUrl}/${id}`, { weight: newWeight });
};

export default {
  getAll,
  create,
  deleteWeight,
  updateById,
};

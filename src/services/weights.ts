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

export default {
  getAll,
  create,
};

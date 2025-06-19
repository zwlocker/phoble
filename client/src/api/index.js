import axios from "axios";

const url = "http://localhost:5100/api/songs";

export const getLatest = () => {
  return axios.get(`${url}/latest`).then((response) => response.data);
};

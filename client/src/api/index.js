import axios from "axios";

const url = "http://localhost:5100/api/songs";

export const getLatest = () => {
  return axios.get(`${url}/latest`).then((response) => response.data);
};

export const addComment = async (message) => {
  const res = await axios.post(`${url}/latest/comments`, { message });
  return res.data;
};

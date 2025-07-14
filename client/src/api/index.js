import axios from "axios";

const url = "http://localhost:5100/api/songs";

export const getSong = async (songId = "latest") => {
  return axios.get(`${url}/${songId}`).then((response) => response.data);
};

export const addComment = async (message, songId = "latest") => {
  const res = await axios.post(`${url}/${songId}/comments`, { message });
  return res.data;
};

export const deleteComment = async (commentId, songId = "latest") => {
  const res = await axios.delete(`${url}/${songId}/comments/${commentId}`);
  return res.data;
};

export const getSongs = () => {
  return axios.get(`${url}`).then((response) => response.data);
};

export const toggleLike = async (commentId, songId = "latest", increment) => {
  const res = await axios.post(
    `${url}/${songId}/comments/${commentId}/${increment}`
  );
  return res.data;
};

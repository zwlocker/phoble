import axios from "axios";

const url = "http://localhost:5100/api/songs";

export const getSong = async (songId = "latest") => {
  const res = await axios.get(`${url}/${songId}`);

  return res.data;
};

export const addComment = async (message, songId = "latest", userId) => {
  const res = await axios.post(`${url}/${songId}/comments`, {
    message,
    userId,
  });
  return res.data;
};

export const deleteComment = async (commentId, songId = "latest") => {
  const res = await axios.delete(`${url}/${songId}/comments/${commentId}`);
  return res.data;
};

export const getSongs = async () => {
  const res = await axios.get(`${url}`);
  return res.data;
};

export const toggleLike = async (
  commentId,
  songId = "latest",
  increment,
  userId
) => {
  const res = await axios.post(
    `${url}/${songId}/comments/${commentId}/${increment}`,
    {
      userId,
    }
  );
  return res.data;
};

export const refreshSong = async () => {
  const res = await axios.post(`${url}/refresh`);
  return res.data;
};

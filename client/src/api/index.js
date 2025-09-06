import axios from "axios";

const url = "https://api.phoble.net/api/songs";

export const getSong = async (songId = "latest") => {
  const res = await axios.get(`${url}/${songId}`);

  return res.data;
};

export const addComment = async (
  message,
  songId = "latest",
  userId,
  rating
) => {
  const res = await axios.post(`${url}/${songId}/comments`, {
    message,
    userId,
    rating,
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

export const initUser = async (userId, username) => {
  try {
    const res = await axios.post(`${url}/initUser`, {
      userId,
      username,
    });

    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

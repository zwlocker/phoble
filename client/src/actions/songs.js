import { getLatest } from "../api";

export const getLatestSong = async () => {
  try {
    return await getLatest();
  } catch (error) {
    console.log(error);
  }
};

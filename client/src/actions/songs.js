import { getLatest } from "../api";

export const getLatestSong = () => async (dispatch) => {
  try {
    const { data } = await getLatest();
    console.log(data);
    dispatch({ type: "FETCH_LATEST", payload: data });
  } catch (error) {}
};

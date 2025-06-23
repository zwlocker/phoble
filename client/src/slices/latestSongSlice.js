import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const latestSongSlice = createSlice({
  name: "latestSong",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.value[state.value.length] = action.payload;
    },
  },
});

export const { addComment } = latestSongSlice.actions;
export default latestSongSlice.reducer;

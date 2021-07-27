import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "handleControls",
  initialState: {
    color: "black",
    handle: "paolo",
  },
  reducers: {
    colorChanged: (handleControls, action) => {
      handleControls.color = action.payload;
    },
    handleChanged: (handleControls, action) => {
      handleControls.handle = action.payload;
    },
  },
});

export const { colorChanged, handleChanged } = slice.actions;
export default slice.reducer;

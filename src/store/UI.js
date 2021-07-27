import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "UI",
  initialState: {
    modal: false,
    loading: false,
    modalType: null,
  },
  reducers: {
    UILoadingStarted: (UI, action) => {
      UI.loading = true;
    },
    UILoaded: (UI, action) => {
      UI.loading = false;
    },
    modalOpened: (UI, action) => {
      UI.modal = true;
    },
    modalClosed: (UI, action) => {
      UI.modal = false;
    },
    modalTypeChanged: (UI, action) => {
      UI.modalType = action.payload;
    },
  },
});

export const {
  UILoaded,
  modalOpened,
  modalClosed,
  UILoadingStarted,
  modalTypeChanged,
} = slice.actions;
export default slice.reducer;

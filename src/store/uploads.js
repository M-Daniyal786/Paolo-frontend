import { createSelector, createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "uploads",
  initialState: {
    files: [],
    loading: false,
  },
  reducers: {
    // actions => action handlers
    uploadStarted: (uploads, action) => {
      uploads.loading = true;
    },
    uploadAdded: (uploads, action) => {
      const upload = { ...action.payload, id: lastId };
      uploads.files.push(upload);
      lastId++;
    },
    uploadSelected: (uploads, action) => {
      let index = uploads.files.findIndex(
        (file) => file.id === action.payload.id
      );
      uploads.files[index].selected = !uploads.files[index].selected;
    },
    uploadsDropped: (uploads, action) => {
      const files = uploads.files.map((value) =>
        value.selected ? { ...value, dropped: true } : value
      );
      uploads.files = files;
    },
    uploadUnDropped: (uploads, action) => {
      uploads.files[action.payload.id].dropped = false;
    },
    uploadsAppended: (uploads, action) => {
      uploads.files.push(...action.payload);
    },
    uploadEnded: (uploads, action) => {
      uploads.loading = false;
    },
    allUploadsSelected: (uploads, action) => {
      uploads.files.forEach((value) => (value.selected = true));
    },
    allUploadsUnSelected: (uploads, action) => {
      uploads.files.forEach((value) => (value.selected = false));
    },
    uploadsSorted: (uploads, action) => {
      let temp = { ...uploads.files[action.payload.oldIndex] };

      uploads.files[action.payload.oldIndex].url =
        uploads.files[action.payload.newIndex].url;

      uploads.files[action.payload.newIndex].url = temp.url;
    },
  },
});

export const getSelectedFiles = createSelector(
  (uploads) => uploads.files,
  (files) => files.filter((file) => file.selected)
);

export const getDroppedFiles = createSelector(
  (uploads) => uploads.files,
  (files) => files.filter((file) => file.dropped)
);

export const {
  uploadStarted,
  uploadEnded,
  uploadAdded,
  uploadSelected,
  uploadsDropped,
  uploadsAppended,
  uploadUnDropped,
  allUploadsSelected,
  allUploadsUnSelected,
  uploadsSorted,
} = slice.actions;
export default slice.reducer;

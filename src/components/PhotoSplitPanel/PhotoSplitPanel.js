import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import {
  allUploadsSelected,
  uploadAdded,
  uploadEnded,
  uploadStarted,
} from "../../store/uploads";
import FileDropZone from "../FileDropZone/FileDropZone";

const PhotoSplitPanel = () => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  const onSelectAllImages = () => dispatchEvent(allUploadsSelected());
  const selectedUploads = useSelector((state) =>
    state.uploads.files.filter((value) => value.selected === true)
  );

  return (
    <div className="control-panel">
      <div className="insta-split-controls">
        <FileDropZone />
        <ImagesContainer />

        <div className="crop-controls-info">
          <p>Total images uploaded: {uploads.files.length}</p>
          <p>Total images selected: {selectedUploads.length}</p>
        </div>

        {/* <Button variant="contained" fullWidth onClick={onSelectAllImages}>
          select all images
        </Button> */}
      </div>

      <ControlPanelTip tip="Tip: Select images you want to crop and drag them on the artboard." />
    </div>
  );
};

export default PhotoSplitPanel;

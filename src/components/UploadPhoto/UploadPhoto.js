import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";

import {
  uploadStarted,
  uploadAdded,
  uploadEnded,
  allUploadsSelected,
  allUploadsUnSelected,
  uploadSelected,
} from "../../store/uploads";
import { bytesToSize } from "../../utils/utilityFunctions";
import FileDropZone from "../FileDropZone/FileDropZone";

const UploadPhotoPanel = () => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const selectedUploads = useSelector((state) =>
    state.uploads.files.filter((value) => value.selected === true)
  );

  const onSelectImage = (id) => dispatch(uploadSelected({ id }));
  const onSelectAllImages = () => dispatch(allUploadsSelected());
  const onUnSelectAllImages = () => dispatch(allUploadsUnSelected());

  const onDrop = useCallback((acceptedFiles) => {
    let totalSizeInBytes = 0;
    dispatch(uploadStarted());
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      totalSizeInBytes += file.size;
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        dispatch(
          uploadAdded({
            path: file.path,
            name: file.name,
            url: reader.result,
            selected: false,
          })
        );
      };
    });
    console.log(bytesToSize(totalSizeInBytes), "Total Size");
    dispatch(uploadEnded());
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="control-panel">
      <div className="crop-controls">
        {/* <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}

        <FileDropZone />

        <ImagesContainer
          selectedType="selected"
          header="Uploaded Images"
          images={uploads.files}
          onSelectImage={onSelectImage}
        />

        <div className="crop-controls-info">
          <p>Total images uploaded: {uploads.files.length}</p>
          <p>Total images selected: {selectedUploads.length}</p>
        </div>

        <div className="crop-controls-buttons">
          <Button variant="contained" onClick={onSelectAllImages}>
            select all images
          </Button>
          <Button variant="contained" onClick={onUnSelectAllImages}>
            unselect all images
          </Button>
        </div>
      </div>

      <ControlPanelTip tip="Tip: Select images you want to crop and drag them on the artboard." />
    </div>
  );
};

export default UploadPhotoPanel;

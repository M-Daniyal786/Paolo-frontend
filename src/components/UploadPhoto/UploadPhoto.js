import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ChromePicker, GithubPicker } from "react-color";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import { Button } from "@material-ui/core";
import ColorizeIcon from "@material-ui/icons/Colorize";

const UploadPhotoPanel = () => {
  const [picker, setPicker] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="control-panel">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <ImagesContainer />

      <div className="handle-control">
        <p>Handle</p>
        <input name="handle" placeholder="@YourHanlde" />
        <br />
        <hr />

        <div className="handle-control-colors">
          <GithubPicker />
          <div
            style={picker ? { display: "block" } : {}}
            className="handle-control-picker"
          >
            <ChromePicker />
          </div>
          <Button
            onClick={() => setPicker(!picker)}
            fullWidth
            variant="contained"
            startIcon={<ColorizeIcon />}
          >
            Color Picker
          </Button>
        </div>
        {/* <div className="handle-control-colors">
          <div className="selected"></div>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
      </div>
    </div>
  );
};

export default UploadPhotoPanel;

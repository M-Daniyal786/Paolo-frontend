import { Button } from "@material-ui/core";
import React from "react";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import AppsIcon from "@material-ui/icons/Apps";

const PhotoSplit = () => {
  return (
    <div className="control-panel">
      <ImagesContainer />
      <div className="split-btn-container">
        <Button fullWidth variant="contained" startIcon={<AppsIcon />}>
          Color Picker
        </Button>
      </div>
    </div>
  );
};

export default PhotoSplit;

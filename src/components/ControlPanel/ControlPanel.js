import { Button, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ChromePicker, GithubPicker } from "react-color";
import UploadPhotoPanel from "../UploadPhoto/UploadPhoto";
import PreviewPhotoPanel from "../PreviewPhotos/PreviewPhotos";
import PhotoSplit from "../PhotoSplit/PhotoSplit";

const Panel = (props) => {
  const { active } = props;

  const displayPanel = () => {
    switch (active) {
      case 0:
        return <UploadPhotoPanel />;
      case 1:
        return <PhotoSplit />;
      case 2:
        return <PreviewPhotoPanel />;
      default:
        break;
    }
  };

  return <>{displayPanel()}</>;
};

export default Panel;

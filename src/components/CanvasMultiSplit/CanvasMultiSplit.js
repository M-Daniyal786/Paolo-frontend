import { Button } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import Cropper from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/photo-1479936343636-73cdc5aae0c3.jpeg";
import {
  croppedImageAdded,
  croppedImagesAdded,
} from "../../store/croppedImages";

const data = {
  1: { top: 0, left: 0, width: 166.66, height: 166.66 },
  2: { top: 0, left: 166.66, width: 166.66, height: 166.66 },
  3: { top: 0, left: 166.66 + 166.66, width: 166.66, height: 166.66 },
  4: { top: 166.66, left: 0, width: 166.66, height: 166.66 },
  5: { top: 166.66, left: 166.66, width: 166.66, height: 166.66 },
  6: { top: 166.66, left: 166.66 + 166.66, width: 166.66, height: 166.66 },
  7: { top: 166.66 + 166.66, left: 0, width: 166.66, height: 166.66 },
  8: { top: 166.66 + 166.66, left: 166.66, width: 166.66, height: 166.66 },
  9: {
    top: 166.66 + 166.66,
    left: 166.66 + 166.66,
    width: 166.66,
    height: 166.66,
  },
  10: {
    top: 0,
    left: 0,
    width: 500,
    height: 500,
  },
};

const CanvasMultiSplit = () => {
  let splits = 1;
  const cropper = useRef(null);
  const nineCroppedImages = [];
  const dispatch = useDispatch();
  const croppedImages = useSelector((state) => state.croppedImages);

  const onStartNineSplit = () => {
    const cropperInstance = cropper.current.cropper;
    cropperInstance.setCropBoxData(data[splits]);

    splits += 1;
    if (splits <= 10) {
      nineCroppedImages.push({
        url: cropperInstance.getCroppedCanvas().toDataURL("image/jpeg", 0.8),
      });
      setTimeout(() => {
        onStartNineSplit();
      }, 150);
      return;
    }

    splits = 0;
    appendCroppedImages();
  };

  const appendCroppedImages = () => {
    let lastId =
      croppedImages.files.length > 0
        ? croppedImages.files[croppedImages.files.length - 1].id
        : 0;
    nineCroppedImages.forEach((element) => {
      lastId++;
      element.id = lastId;
    });
    dispatch(croppedImagesAdded(nineCroppedImages, lastId));
  };

  return (
    <div className="canvas">
      <p className="canvas-header">Insta Split</p>
      <div className="canvas-page">
        <Cropper
          src={image}
          viewMode={3}
          ref={cropper}
          cropBoxMovable={false}
          cropBoxResizable={false}
          initialAspectRatio={1 / 1}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "teal",
          }}
          onInitialized={(instance) => {
            setTimeout(() => {
              instance.setCropBoxData({ width: 500, height: 500 });
            }, 50);
          }}
        />
      </div>
      <Button
        variant="contained"
        onClick={() => onStartNineSplit(0, 0, 166.66, 166.66)}
      >
        Crop Photos
      </Button>
    </div>
  );
};

export default CanvasMultiSplit;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageHandleCanvas from "../ImageHandleCanvas/ImageHandleCanvas";
import testImage from "../../assets/photo-1479936343636-73cdc5aae0c3.jpeg";
import { Button } from "@material-ui/core";

const CanvasHandle = () => {
  const canvas = useRef(null);
  const dispatch = useDispatch();
  const [selectedForHandle, setSelectedForHandle] = useState(null);
  const croppedImages = useSelector((state) => state.croppedImages);

  useEffect(() => {
    const selected = croppedImages.files.findIndex(
      (value) => value.selectedForHandle === true
    );
    if (selected >= 0) {
      setSelectedForHandle(croppedImages.files[selected]);
    }
  }, [croppedImages.files, selectedForHandle]);

  const addHandleOverImage = () => {
    console.log(canvas.current);
  };

  return (
    <div className="canvas">
      <p className="canvas-header">Add Handle</p>
      <div className="canvas-page">
        <ImageHandleCanvas
          setCanvas={(value) => console.log(value)}
          image={selectedForHandle ? selectedForHandle.url : testImage}
        />
      </div>
      <Button
        className="canvas-action-button"
        variant="contained"
        onClick={addHandleOverImage}
      >
        Add Handle
      </Button>
    </div>
  );
};

export default CanvasHandle;

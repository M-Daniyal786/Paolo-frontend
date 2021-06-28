import { Button } from "@material-ui/core";
import React from "react";
import Cropper from "react-cropper";

const Canvas = () => {
  return (
    <div className="canvas">
      <Button variant="contained">Add Handle</Button>
      <div className="canvas-page">
        <Cropper
          src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
          initialAspectRatio={1 / 1}
          viewMode={1}
          dragMode="move"
          wheelZoomRatio={0.05}
          style={{ width: "500px", height: "500px", backgroundColor: "teal" }}
        />
      </div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
      <p>Page 1</p>
      <div className="canvas-page"></div>
    </div>
  );
};

export default Canvas;

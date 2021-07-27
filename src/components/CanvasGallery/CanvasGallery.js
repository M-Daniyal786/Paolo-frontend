import { useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";

const CanvasGallery = () => {
  const focusedImage = useRef(null);
  const croppedImages = useSelector((state) => state.croppedImages);

  useEffect(() => {
    if (focusedImage.current !== null) {
      focusedImage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [croppedImages]);

  return (
    <div className="canvas">
      <p className="canvas-header">Gallery</p>
      <div className="canvas-gallery">
        {croppedImages.files.map((value, index) => {
          return (
            <img
              key={index}
              className="canvas-gallery-img"
              alt={`cropped ${value.id}`}
              src={value.url}
              style={{ borderColor: value.focused ? "yellow" : "black" }}
              ref={value.focused ? focusedImage : null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CanvasGallery;

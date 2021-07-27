import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSelected } from "../../store/uploads";
import DragableImage from "../DragableImage/DragableImage";

const ImagesContainer = (props) => {
  const { header, images, selectedType, onSelectImage } = props;

  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  // const onSelectImage = (id) => dispatch(uploadSelected({ id }));

  return (
    <div className="uploaded-images">
      <p>{header}</p>
      <div className="uploaded-image-container">
        {images &&
          images.map((value, index) => (
            <DragableImage
              key={index}
              index={index}
              src={value.url}
              dropable={false}
              selected={value[selectedType]}
              onSelect={() => onSelectImage(value.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(ImagesContainer);

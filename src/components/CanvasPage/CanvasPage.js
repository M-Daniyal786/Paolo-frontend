import React from "react";
import { useDrop } from "react-dnd";
import Cropper from "react-cropper";
import Overlay from "../Overlay/Overlay";
import { ItemTypes } from "../../utils/ItemTypes";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { uploadsSorted, uploadUnDropped } from "../../store/uploads";

const CanvasPage = (props) => {
  const { index, image, pageNumber, onDropFiles, getCropperInstance } = props;

  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      drop: () => onDropFiles(),
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const onImageRemove = () => dispatch(uploadUnDropped({ id: index }));
  const onImageMoveUp = () =>
    dispatch(uploadsSorted({ oldIndex: index, newIndex: index - 1 }));
  const onImageMoveDown = () =>
    dispatch(uploadsSorted({ oldIndex: index, newIndex: index + 1 }));

  return (
    <>
      <div ref={drop} className="canvas-page">
        {canDrop && <Overlay type="Legal" />}
        <div className="canvas-page-icongroup">
          <IconButton
            onClick={onImageMoveUp}
            aria-label="move-up"
            size="medium"
            disabled={index > 0 ? false : true}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={onImageMoveDown}
            aria-label="move-down"
            size="medium"
            disabled={index >= uploads.files.length - 1 ? true : false}
          >
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton onClick={onImageRemove} aria-label="remove" size="medium">
            <DeleteForeverIcon />
          </IconButton>
        </div>
        <Cropper
          src={image}
          viewMode={3}
          dragMode="move"
          wheelZoomRatio={0.05}
          initialAspectRatio={1 / 1}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "teal",
          }}
          minCropBoxHeight={500}
          minCropBoxWidth={500}
          onInitialized={(instance) => {
            if (getCropperInstance) {
              getCropperInstance(instance);
            }
          }}
        />
      </div>
      <p>Page {pageNumber + 1}</p>
    </>
  );
};

export default CanvasPage;

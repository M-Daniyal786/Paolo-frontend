import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CanvasPage from "../CanvasPage/CanvasPage";
import { getDroppedFiles, uploadsDropped } from "../../store/uploads";
import { croppedImagesAdded } from "../../store/croppedImages";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
import Overlay from "../Overlay/Overlay";
import CanvasGallery from "../CanvasGallery/CanvasGallery";
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!./worker";
import CanvasMultiSplit from "../CanvasMultiSplit/CanvasMultiSplit";
import CanvasHandle from "../CanvasHandle/CanvasHandle";

const Canvas = (props) => {
  const dispatch = useDispatch();
  const { active, croppers, setCroppers } = props;

  const uploads = useSelector((state) => state.uploads);
  const croppedImages = useSelector((state) => state.croppedImages);

  const acceptDrops = () => dispatch(uploadsDropped());

  const onCropImages = async () => {
    window.performance.mark("cropStart");
    // let instance = worker();
    // try {
    //   // console.log(croppers);
    //   let data = await instance.cropImages(
    //     console.log(croppers[1].getCroppedCanvas().toString())
    //   );
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // }

    let allCroppedData = [];
    let lastId =
      croppedImages.files.length > 0
        ? croppedImages.files[croppedImages.files.length - 1].id
        : 0;
    if (lastId >= 1) lastId++;
    croppers.forEach((value) => {
      allCroppedData.push({
        url: value.getCroppedCanvas().toDataURL("image/jpeg", 0.8),
        id: lastId,
      });
      lastId++;
    });
    dispatch(croppedImagesAdded(allCroppedData, lastId));

    window.performance.mark("cropEnd");
    window.performance.measure("cropMeasure", "cropStart", "cropEnd");
  };

  const renderCanvasPages = () =>
    getDroppedFiles(uploads).length >= 1 ? (
      getDroppedFiles(uploads).map((value, index) => (
        <CanvasPage
          key={index}
          index={value.id}
          image={value.url}
          pageNumber={index}
          getCropperInstance={(cropper) =>
            setCroppers((prevState) => [...prevState, cropper])
          }
        />
      ))
    ) : (
      <CanvasPage onDropFiles={acceptDrops} pageNumber={0} />
    );

  const onDropAppeandFiles = () => {};

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      drop: () => onDropAppeandFiles(),
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  const renderCanvas = () => {
    switch (active) {
      case 0:
        return (
          <div ref={drop} className="canvas">
            <p className="canvas-header">Mutli Crop</p>
            {canDrop && <Overlay type="Legal" />}
            {renderCanvasPages()}
            <Button
              className="canvas-action-button"
              variant="contained"
              onClick={onCropImages}
            >
              Crop Photos
            </Button>
          </div>
        );
      case 1:
        return <CanvasHandle />;
      case 2:
        return <CanvasMultiSplit />;
      case 3:
        return <CanvasGallery />;
      default:
        break;
    }
  };

  return <>{renderCanvas()}</>;
};

export default Canvas;

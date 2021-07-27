import React, { useEffect, useState, useRef } from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import IphoneMockup from "../IphoneMockup/IphoneMockup";
import {
  croppedImageFocused,
  croppedImagesSorted,
} from "../../store/croppedImages";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import DragableImage from "../DragableImage/DragableImage";

const PreviewPhotoPanel = () => {
  const dispatch = useDispatch();
  const cache = useRef(
    new CellMeasurerCache({ fixedWidth: true, defaultHeight: 150 })
  );
  const croppedImages = useSelector((state) => state.croppedImages);

  const onSelectImage = (imageId) =>
    dispatch(croppedImageFocused({ id: imageId }));

  const onRearrangeImages = (newIndex, oldIndex) =>
    dispatch(croppedImagesSorted({ dragged: oldIndex, dropedOn: newIndex }));

  return (
    <div className="control-panel">
      <div className="gallery-control">
        <IphoneMockup>
          <div className="device-body">
            <AutoSizer>
              {({ width, height }) => {
                const itemsPerRow = 3;
                const rowCount = Math.ceil(croppedImages.files.length / 3);

                return (
                  <List
                    width={width}
                    height={height}
                    rowHeight={72}
                    // rowHeight={cache.current.rowHeight}
                    // deferredMeasurementCache={cache.current}
                    rowCount={rowCount}
                    rowRenderer={({ key, index, style, parent }) => {
                      const items = [];
                      const fromIndex = index * itemsPerRow;
                      const toIndex = Math.min(
                        fromIndex + 3,
                        croppedImages.files.length
                      );

                      for (let i = fromIndex; i < toIndex; i++) {
                        items.push(
                          <DragableImage
                            key={i}
                            index={croppedImages.files[i].id}
                            src={croppedImages.files[i].url}
                            alt={`cropped ${croppedImages.files[i].id}`}
                            dropable={true}
                            onSelect={() =>
                              onSelectImage(croppedImages.files[i].id)
                            }
                            onRearrangeImages={onRearrangeImages}
                          />
                        );
                      }
                      // return (
                      //   <CellMeasurer
                      //     key={key}
                      //     parent={parent}
                      //     columnIndex={0}
                      //     rowIndex={index}
                      //     cache={cache.current}
                      //   >
                      //     <div style={style}>{items}</div>
                      //   </CellMeasurer>
                      // );
                      return <div style={style}>{items}</div>;
                    }}
                  />
                );
              }}
            </AutoSizer>
          </div>
          <div className="device-footer">
            <HomeIcon />
            <SearchIcon />
            <ControlPointIcon />
            <FavoriteBorderIcon />
            <AccountCircleIcon />
          </div>
        </IphoneMockup>
      </div>
    </div>
  );
};

export default PreviewPhotoPanel;

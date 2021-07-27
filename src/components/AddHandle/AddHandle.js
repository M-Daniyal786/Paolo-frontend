import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import ColorizeIcon from "@material-ui/icons/Colorize";
import { ChromePicker, GithubPicker } from "react-color";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";
import { useDispatch, useSelector } from "react-redux";
import { colorChanged, handleChanged } from "../../store/handleControls";
import FileDropZone from "../FileDropZone/FileDropZone";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import { croppedImageSelectForHandle } from "../../store/croppedImages";

const AddHandle = () => {
  const dispatch = useDispatch();
  const [picker, setPicker] = useState(false);
  const croppedImages = useSelector((state) => state.croppedImages);
  const handleControls = useSelector((state) => state.handleControls);

  const onSelectImage = (id) => dispatch(croppedImageSelectForHandle({ id }));

  return (
    <div className="control-panel">
      <div className="handle-control">
        <ImagesContainer
          header="Cropped Images"
          images={croppedImages.files}
          onSelectImage={onSelectImage}
          selectedType="selectedForHandle"
        />

        <p className="handle-control-label">Handle</p>
        <input
          name="handle"
          placeholder="@YourHanlde"
          value={handleControls.handle}
          onChange={(event) => dispatch(handleChanged(event.target.value))}
        />
        <br />
        <hr />

        <div className="handle-control-colors">
          <GithubPicker
            width={300}
            onChangeComplete={(color, event) =>
              dispatch(colorChanged(color.hex))
            }
          />
          <div
            style={picker ? { display: "block" } : {}}
            className="handle-control-picker"
          >
            <ChromePicker
              color={handleControls.color}
              onChange={(color, event) => dispatch(colorChanged(color.hex))}
            />
          </div>
          <Button
            onClick={() => setPicker(!picker)}
            fullWidth
            variant="contained"
            startIcon={<ColorizeIcon />}
          >
            {picker ? `Hide` : "Show"} Color Picker
          </Button>
        </div>
      </div>

      <ControlPanelTip tip="Tip: Write your handle in the text field and select text color." />
    </div>
  );
};

export default AddHandle;

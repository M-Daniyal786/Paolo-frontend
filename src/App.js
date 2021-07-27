import React, { useState } from "react";
import "cropperjs/dist/cropper.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Appbar from "./components/Appbar/Appbar";
import Canvas from "./components/Canvas/Canvas";
import Sidebar from "./components/Sidebar/Sidebar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { useDispatch, useSelector } from "react-redux";
import { downloadImages } from "./utils/utilityFunctions";
import Modal from "./components/Modal/Modal";
import { modalOpened, modalTypeChanged } from "./store/UI";

const App = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const [croppers, setCroppers] = useState([]);
  const [projectName, setProjectName] = useState();

  const UI = useSelector((state) => state.UI);

  const onDownloadCroppedData = () => {
    let allCroppedData = [];
    croppers.forEach((value) => {
      allCroppedData.push(value.getCroppedCanvas().toDataURL());
    });
    downloadImages(allCroppedData, projectName ? projectName : "default");
  };

  const onDonate = () => {
    dispatch(modalOpened());
    dispatch(modalTypeChanged("donate"));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Appbar
          projectName={projectName}
          onClickDonate={onDonate}
          setProjectName={setProjectName}
          onClickDownload={onDownloadCroppedData}
        />
        <div className="container">
          <Sidebar active={active} setActive={setActive} />
          <ControlPanel active={active} />
          <Canvas
            active={active}
            croppers={croppers}
            setCroppers={setCroppers}
          />
          {UI.modal ? <Modal /> : null}
        </div>
      </DndProvider>
    </>
  );
};

export default App;

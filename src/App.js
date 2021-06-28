import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Appbar from "./components/Appbar/Appbar";
import Canvas from "./components/Canvas/Canvas";

const App = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <Appbar />
      <div className="container">
        <Sidebar active={active} setActive={setActive} />
        <ControlPanel active={active} />
        <Canvas />
        {/* <div>
          <Cropper
            src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
            initialAspectRatio={1 / 1}
            viewMode={0}
            dragMode="move"
            wheelZoomRatio={0.05}
            style={{ width: "100%", height: "100%", backgroundColor: "teal" }}
          />
        </div> */}
      </div>
    </>
  );
};

export default App;

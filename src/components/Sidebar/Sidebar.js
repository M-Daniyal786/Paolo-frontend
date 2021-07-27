import React, { useState } from "react";

import BackupIcon from "@material-ui/icons/Backup";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import StayCurrentPortraitIcon from "@material-ui/icons/StayCurrentPortrait";

const Sidebar = (props) => {
  const { active, setActive } = props;

  return (
    <div className="sidebar">
      <ul>
        <li
          onClick={() => setActive(0)}
          className={active === 0 ? "selected" : ""}
        >
          <BackupIcon fontSize="large" />
          <p>Upload & Crop</p>
        </li>
        <li
          onClick={() => setActive(1)}
          className={active === 1 ? "selected" : ""}
        >
          <p style={{ fontSize: "20px", marginBottom: "6px" }}>@</p>
          {/* <BackupIcon fontSize="large" /> */}
          <p>Add Hanlde</p>
        </li>
        <li
          onClick={() => setActive(2)}
          className={active === 2 ? "selected" : ""}
        >
          <VerticalSplitIcon fontSize="large" />
          <p>Photo Split</p>
        </li>
        <li
          onClick={() => setActive(3)}
          className={active === 3 ? "selected" : ""}
        >
          <StayCurrentPortraitIcon fontSize="large" />
          <p>Feed Preview</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

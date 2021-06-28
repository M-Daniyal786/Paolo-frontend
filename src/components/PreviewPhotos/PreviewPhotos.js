import React, { useCallback } from "react";
import "html5-device-mockups/dist/device-mockups.min.css";
import { IPhoneSE } from "react-device-mockups";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const PreviewPhotoPanel = () => {
  return (
    <div className="control-panel">
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IPhoneSE
          height={550}
          orientation="portrait"
          color="white"
          buttonProps={{
            onClick: () => alert("Home Button Clicked!"),
          }}
        >
          <div className="control-panel-device-screen">
            <div className="control-panel-device">
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
              <img src="https://static-01.daraz.pk/p/6a78913c131cfcd539813bd4b7c42459.png.jpg" />
            </div>
            <div className="control-panel-device-footer">
              <HomeIcon />
              <SearchIcon />
              <ControlPointIcon />
              <FavoriteBorderIcon />
              <AccountCircleIcon />
            </div>
          </div>
        </IPhoneSE>
      </div>
    </div>
  );
};

export default PreviewPhotoPanel;

import React from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import PaymentIcon from "@material-ui/icons/Payment";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const Appbar = () => {
  return (
    <div className="appbar">
      <div className="appbar-left">
        <p>App Name</p>
      </div>

      <div className="appbar-right">
        <div>
          <Button variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button variant="contained" startIcon={<CreateIcon />}>
            Write Us
          </Button>
        </div>

        {/* <p>Project Title - Untitled</p> */}
        <input placeholder="Project Title - Untitled" />

        <div>
          <Button variant="contained" startIcon={<PaymentIcon />}>
            Donate
          </Button>
          <Button variant="contained" startIcon={<ShareIcon />}>
            Share
          </Button>
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;

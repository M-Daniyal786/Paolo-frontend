import { IconButton } from "@material-ui/core";
import Share from "@material-ui/icons/Share";
import React from "react";
import Donate from "./Donate/Donate";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { modalClosed } from "../../store/UI";

const Modal = (props) => {
  const { type } = props;

  const dispatch = useDispatch();

  const UI = useSelector((state) => state.UI);

  const renderContent = (type) => {
    const content = { donate: <Donate />, share: <Share /> };
    return content[type];
  };

  const onCloseModal = () => dispatch(modalClosed());

  return (
    <div className="modal">
      <div className="modal-inner">
        <IconButton
          id="modal-close-icon"
          aria-label="close"
          size="medium"
          onClick={onCloseModal}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
        {renderContent(UI.modalType)}
      </div>
    </div>
  );
};

export default Modal;

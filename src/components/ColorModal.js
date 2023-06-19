import React from "react";
import ColorSelector from "./ColorSelector";
import "../styling/colortheme.css";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, setGeneralColor } from "../Features/colorSlice";
/**
 * This is a component that holds three color components and used to control the secondary color scheme of the application
 */
const ColorModal = () => {
  const { isColorModalOpen, generalColor } = useSelector(
    (state) => state.generalColor
  );
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    dispatch(setGeneralColor(color));
    dispatch(closeModal());
  };

  return (
    <div
      className="color-modal-container"
      style={{ display: isColorModalOpen ? "flex" : "none" }}
    >
      <div className="color-box">
        <div className="color-title">
          <h1>Choose Theme</h1>
        </div>

        <div className="color-group">
          <div className="primary" onClick={() => handleColorChange("#DF3939")}>
            <ColorSelector
              color="#DF3939"
              border={generalColor === "#E85382" ? "#bababa" : "transparent"}
            />
          </div>
          <div
            className="secondary"
            onClick={() => handleColorChange("#39BADF")}
          >
            <ColorSelector
              color="#39BADF"
              border={generalColor === "#39BADF" ? "#bababa" : "transparent"}
            />
          </div>
          <div
            className="tertiary"
            onClick={() => handleColorChange("#E1A725")}
          >
            <ColorSelector
              color="#E1A725"
              border={generalColor === "#E1A725" ? "#bababa" : "transparent"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;

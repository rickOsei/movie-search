import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

import { MdClose } from "react-icons/md";

import { closeSideModal } from "../Features/listSlice";

import ColorThief from "colorthief";

/**
 * The Figure component returns an figure element containing an image which is the Poster of the selected movie and the background is determined by the extracting the secondary and primary colors of the Poster image
 */

const Figure = ({ poster }) => {
  const [rgb, setRgb] = useState([]);
  const dispatch = useDispatch();

  function getDominantColor(imageUrl, callback) {
    const img = document.createElement("IMG");
    const colorThief = new ColorThief();
    img.setAttribute("src", imageUrl);
    img.crossOrigin = "Anonymous";
    if (img.complete) {
      callback(colorThief.getColor(img));
    } else {
      img.addEventListener("load", function () {
        callback(colorThief.getColor(img));
      });
    }
  }

  useEffect(() => {
    getDominantColor(`${poster}`, setRgb);
  }, [poster]);
  return (
    <figure
      className="side-modal-icon"
      style={{
        background: `rgb(${rgb})`,
        background: `linear-gradient(180deg,rgb(${rgb?.map(
          (v) => v + 30
        )}),rgb(${rgb?.map((v) => v - 30)}))`,
      }}
    >
      <button
        className="side-modal-close-btn"
        onClick={() => dispatch(closeSideModal())}
      >
        <MdClose />
      </button>

      <img src={poster} alt={poster} />
    </figure>
  );
};

export default Figure;

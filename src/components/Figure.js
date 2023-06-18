import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

import { FaArrowLeft } from "react-icons/fa";

import { closeSideModal } from "../Features/listSlice";

import ColorThief from "colorthief";

const Figure = ({ sprites, singlePokemonDetails, name }) => {
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
    getDominantColor(`${sprites.other.dream_world.front_default}`, setRgb);
    // }
  }, [singlePokemonDetails]);
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
        <FaArrowLeft />
      </button>

      <img src={sprites.other.dream_world.front_default} alt={name} />
    </figure>
  );
};

export default Figure;

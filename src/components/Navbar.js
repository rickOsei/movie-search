import "../styling/navbar.css";

import React, { useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ColorSelector from "./ColorSelector";
import Title from "./Title";
import { setSearchItem } from "../Features/listSlice";
import { openModal } from "../Features/colorSlice";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { generalColor } = useSelector((state) => state.generalColor);
  const dispatch = useDispatch();

  const dispatchSearchItem = () => {
    if (searchTerm) {
      dispatch(setSearchItem(searchTerm));
    }
  };
  useEffect(() => {
    dispatchSearchItem();
  }, [searchTerm]);

  return (
    <nav>
      <div className="dummy-blend"></div>
      <NavLink to={"/"} className="nav-logo">
        <Title margin="14px 0 0 15px" />
      </NavLink>
      <div className="nav-search-input">
        <input
          type="text"
          placeholder="Maybe Avatar ?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: `2px solid ${generalColor}` }}
        />
        <div className="nav-search-icon">
          <MdOutlineSearch />
        </div>
      </div>
      <section
        className="nav-color-selector"
        onClick={() => dispatch(openModal())}
      >
        <ColorSelector color={generalColor} />
      </section>
    </nav>
  );
};

export default Navbar;

import "../styling/homeview.css";

import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../svg/Logo";
import Title from "../components/Title";
import { setSearchItem } from "../Features/listSlice";

const HomeView = ({ color }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const { generalColor } = useSelector((state) => state.generalColor);
  const dispatch = useDispatch();

  const dispatchSearchItem = () => {
    dispatch(setSearchItem(searchInput));
    navigate("/pokemon-list");
  };

  return (
    <main>
      <div className="home-main-container">
        <section className="logo-name-description">
          <figure className="home-logo">
            <Logo />
          </figure>
          <Title fontSize="48px" margin="0 0 15px 0" />
        </section>

        <section className="search-view">
          <input
            type="text"
            placeholder="Maybe Avatar ?"
            style={{ borderColor: generalColor }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div
            className="search-icon"
            style={{ background: generalColor }}
            onClick={dispatchSearchItem}
          >
            <MdOutlineSearch />
          </div>
          <NavLink to={"/movie-list"}>
            <h4 className="view-list-link">View all</h4>
          </NavLink>
        </section>
      </div>
    </main>
  );
};

export default HomeView;

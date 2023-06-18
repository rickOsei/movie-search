import "../styling/sidemodal.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Figure from "./Figure";
import Similar from "./Similar";
import AboutPokemon from "./AboutPokemon";
import PokemonStats from "./PokemonStats";

const SideModal = ({ pokemonDetails }) => {
  const [activeButton, setActiveButton] = useState("about");
  const [singlePokemonDetails, setSinglePokemonDetails] = useState([]);
  const { pokemonName, isModalOpen } = useSelector(
    (state) => state.pokemonList
  );

  useEffect(() => {
    if (pokemonName) {
      setSinglePokemonDetails(
        pokemonDetails.filter((pokemon) => pokemon.name === pokemonName)
      );
    }
  }, [pokemonDetails]);

  if (singlePokemonDetails.length === 0) {
    return (
      <aside
        className="side-modal-container"
        style={{
          right: isModalOpen ? 0 : "-150%",
        }}
      >
        <h1>Loading...</h1>
      </aside>
    );
  }

  const { sprites, name, types, abilities, height, weight, stats } =
    singlePokemonDetails[0];

  return (
    <aside
      className="side-modal-section"
      style={{
        right: isModalOpen ? 0 : "-150%",
      }}
    >
      <div
        className="side-modal-container"
        style={{
          right: isModalOpen ? 0 : "-150%",
        }}
      >
        <section className="pokemon-desc">
          <Figure
            sprites={sprites}
            singlePokemonDetails={singlePokemonDetails}
            name={name}
          />
          <div className="pokemon-details">
            <h1 className="side-modal-pokemon-name">{name}</h1>
            <div className="pokemon-types">
              {types.map((pokemon, index) => {
                return (
                  <h4 className="side-modal-pokemon-type" key={index}>
                    {pokemon.type.name}
                  </h4>
                );
              })}
            </div>
          </div>
        </section>
        <section
          className="about-pokemon"
          style={{ display: activeButton === "about" ? "flex" : "none" }}
        >
          <AboutPokemon height={height} weight={weight} abilities={abilities} />
        </section>
        <section
          className="pokemon-stats"
          style={{ display: activeButton === "stats" ? "flex" : "none" }}
        >
          <h1 className="side-modal-title">Stats</h1>
          <PokemonStats stats={stats} />
        </section>
        <section
          className="similar-pokemon-section"
          style={{ display: activeButton === "similar" ? "block" : "none" }}
        >
          <h1 className="side-modal-title">Similar</h1>
          <div className="similar-pokemon">
            <Similar types={types} pokemonDetails={pokemonDetails} />
          </div>
        </section>

        <section className="side-modal-buttons">
          <div className="button-container">
            <button
              className="side-btn"
              onClick={() => setActiveButton("about")}
              style={{
                background: activeButton === "about" ? "white" : "transparent",
              }}
            >
              About
            </button>
            <button
              className="side-btn"
              onClick={() => setActiveButton("stats")}
              style={{
                background: activeButton === "stats" ? "white" : "transparent",
              }}
            >
              Stats
            </button>
            <button
              className="side-btn"
              onClick={() => setActiveButton("similar")}
              style={{
                background:
                  activeButton === "similar" ? "white" : "transparent",
              }}
            >
              Similar
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SideModal;

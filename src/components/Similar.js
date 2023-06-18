import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Similar = ({ types, pokemonDetails }) => {
  const [similar, setSimilar] = useState([]);
  const { movieId } = useSelector((state) => state.movieList);

  if (similar.length === 0) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>;
      </div>
    );
  }
  const similarFiltered = similar.slice(0, 2);

  return (
    <>
      {similarFiltered.map((pokemon, index) => {
        const { name, sprites } = pokemon;
        return (
          <article className="side-pokemon-card" key={index}>
            <figure className="side-pokemon-icon">
              <img src={sprites.other.dream_world.front_default} alt={name} />
            </figure>
            <div className="side-pokemon-details">
              <h1 className="pokemon-name">{name}</h1>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Similar;

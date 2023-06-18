import ViewButton from "./ViewButton";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonName, openSideModal } from "../Features/listSlice";
import "../styling/movieCard.css";

const MovieCard = ({ name, types, sprites }) => {
  const { isModalOpen, pokemonName } = useSelector(
    (state) => state.pokemonList
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPokemonName(name));
    dispatch(openSideModal());
  };

  return (
    <>
      <article className="movie-card">
        <figure className="movie-icon">
          <img src={sprites.other.dream_world.front_default} alt={name} />
        </figure>
        <div className="movie-details">
          <h1 className="movie-name">{name}</h1>
          <div className="movie-types">
            {types.map((pokemon, index) => {
              return (
                <h4 className="movie-type" key={index}>
                  {pokemon.type.name}
                </h4>
              );
            })}
          </div>
        </div>
        <div className="overlay">
          <div className="overlay-items">
            <button className="view-more">View More</button>
          </div>
        </div>
        <ViewButton handleClick={handleClick} />
      </article>
    </>
  );
};

export default MovieCard;

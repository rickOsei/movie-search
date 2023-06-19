import ViewButton from "./ViewButton";
import { useDispatch, useSelector } from "react-redux";
import { setMovieId, openSideModal } from "../Features/listSlice";
import "../styling/movieCard.css";

/**
 * The MovieCard component returns an article which represents a card containing the information of each individual movie. When hovered the "View More" button shows which when clicked opens the side modal which contains more information about the movie.
 */

const MovieCard = ({ Title, Year, Poster, imdbID }) => {
  const { isModalOpen, movieId } = useSelector((state) => state.movieList);

  const { generalColor } = useSelector((state) => state.generalColor);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setMovieId(imdbID));
    dispatch(openSideModal());
  };

  return (
    <>
      <article className="movie-card">
        <figure className="movie-icon">
          <img src={Poster} alt={Title} />
        </figure>
        <div className="movie-details">
          <h1 className="movie-title">{Title}</h1>
          <div className="movie-year">{Year}</div>
        </div>
        <div className="overlay">
          <div
            className="overlay-items"
            style={{
              border: `2px solid ${generalColor}`,
            }}
            onClick={handleClick}
          >
            <ViewButton />
          </div>
        </div>
      </article>
    </>
  );
};

export default MovieCard;

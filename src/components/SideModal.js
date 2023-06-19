import "../styling/sidemodal.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Figure from "./Figure";
import axios from "axios";
import { dummyObject } from "../dummy-data";
import imdb from "../images/imdb.png";
import tomato from "../images/tomato.png";
import { toast } from "react-toastify";

/**
 * The SideModal component contains functions that are used to fetch and display more info about a particular movie.
 */

const SideModal = () => {
  const { movieId, isModalOpen } = useSelector((state) => state.movieList);
  const [singleMovieDetails, setSingleMovieDetails] = useState(dummyObject);
  const [reviews, setReviews] = useState([]);
  const apiKey = "a310a0e3";

  const getMoreMovieDetails = async () => {
    if (movieId) {
      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`
        );
        setSingleMovieDetails(data);
      } catch (error) {
        toast.error(`${error.response.data.Error}`);
      }
    }
  };

  useEffect(() => {
    getMoreMovieDetails();
  }, [movieId]);

  const {
    Poster,
    Title,
    Year,
    Genre,
    Ratings,
    Plot,
    Runtime,
    imdbRating,
    Actors,
  } = singleMovieDetails;

  // Getting Reviews
  const key = "9WouZZwa9H2ftdsaUazlM23fIRtgrBVr";
  const url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${Title}&api-key=${key}`;

  const getReviews = async () => {
    try {
      const { data } = await axios.get(url);
      setReviews("");
      if (data.results) {
        setReviews(data.results);
      }
    } catch (error) {
      toast.error(`${error.response.data.fault.faultstring}`);
    }
  };

  useEffect(() => {
    getReviews();
  }, [singleMovieDetails]);

  if (singleMovieDetails.length < 1) {
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
        <section className="movie-desc">
          <Figure poster={Poster} />
          <div className="sidebar-movie-details">
            <p className="title">{Title}</p>
            <p className="other-info">
              {Year} | {Genre} | {Runtime}
            </p>
          </div>
          <div className="ratings-row">
            {Ratings.map((rating, index) => {
              return (
                <div className="ratings" key={index}>
                  <img src={tomato} alt="rating" />
                  {rating.Value}
                </div>
              );
            })}
            <div className="imdb">
              <img src={imdb} alt="rating" />
              {imdbRating}
            </div>
          </div>
          <p className="plot">{Plot}</p>
          <p className="actors">Actors: {Actors}</p>
          <div className="reviews">
            <div className="movie">
              <div className="title">
                <h2>Reviews</h2>
              </div>
              <div className="details">
                <h4 className="rating">
                  {reviews[0]?.mpaa_rating || "Unrated"}
                </h4>
                <h4 className="genre">{reviews[0]?.critics_pick}</h4>
                <h4 className="direct">{reviews[0]?.publication_date}</h4>
              </div>
              <p className="info">{reviews[0]?.summary_short}</p>
              <h4 className="byline">
                <span>by</span> {reviews[0]?.byline}
              </h4>

              <h4 className="headline">{reviews[0]?.headline}</h4>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SideModal;

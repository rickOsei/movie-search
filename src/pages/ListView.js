import "../styling/listview.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SideModal from "../components/SideModal";
import ColorModal from "../components/ColorModal";
import { dummyData } from "../dummy-data";

import { setSearchItem } from "../Features/listSlice";
import SelectComponent from "../components/SelectComponent";
import { useDebounce } from "../components/useDebounce";

const ListView = () => {
  const { movieList, searchState, isLoading, isModalOpen } = useSelector(
    (state) => state.movieList
  );
  const { generalColor } = useSelector((state) => state.generalColor);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(searchState);

  const [movieDetails, setMovieDetails] = useState(dummyData);

  const apiKey = "a310a0e3";

  const searchQuery = useDebounce(searchTerm, 2000);

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`
      );
      setMovieDetails(data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [searchQuery]);

  console.log(movieDetails);
  console.log(searchQuery);

  // react paginate

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(movieDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(movieDetails.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, searchQuery, movieDetails]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % movieDetails.length;
    setItemOffset(newOffset);
  };

  // search logic

  // const dispatchSearchItem = () => {
  //   if (searchTerm) {
  //     dispatch(setSearchItem(searchTerm));
  //   }
  // };
  // useEffect(() => {
  //   dispatchSearchItem();
  // }, [searchTerm]);

  // const filteredList = currentItems.filter((pokemon) => {
  //   if (searchState && searchTerm) {
  //     return pokemon.name
  //       .toLocaleLowerCase()
  //       .includes(searchState.toLocaleLowerCase());
  //   } else {
  //     return pokemon;
  //   }
  // });

  // Conditional rendering
  console.log(currentItems);

  // if (currentItems.length === 0) {
  //   return (
  //     <div className="loading-container">
  //       <ReactLoading
  //         color={generalColor}
  //         height={100}
  //         width={100}
  //         type={"spin"}
  //       />
  //     </div>
  //   );
  // }
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="list-search-input">
        <input
          type="text"
          placeholder="Maybe Avatar ?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: `2px solid ${generalColor}` }}
        />
        <div className="list-search-icon">
          <MdOutlineSearch />
        </div>
      </div>
      <section className="movie-list-section">
        <div className="movie-list-container">
          {currentItems.map((movie, index) => {
            return <MovieCard {...movie} key={index} />;
          })}
        </div>
        <div className="pagination-controls">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BsChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel={<BsChevronLeft />}
            renderOnZeroPageCount={null}
            containerClassName="movie-pagination"
            pageLinkClassName="movie-page-nav"
            previousLinkClassName="movie-page-nav"
            nextLinkClassName="movie-page-nav"
            activeLinkClassName="active-num"
          />

          <SelectComponent
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </section>

      <ColorModal />
      <SideModal />
    </>
  );
};

export default ListView;

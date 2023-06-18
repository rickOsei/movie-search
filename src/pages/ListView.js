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

import { setSearchItem } from "../Features/listSlice";
import SelectComponent from "../components/SelectComponent";

const ListView = () => {
  const { pokemonList, searchState, isLoading, isModalOpen } = useSelector(
    (state) => state.pokemonList
  );
  const { generalColor } = useSelector((state) => state.generalColor);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(searchState);

  const [tempPokemonDetails, setTempPokemonDetails] = useState([]);

  const getMovieDetails = (arr) => {
    arr.forEach(async (pokemon) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );

      setTempPokemonDetails((prev) => [...prev, data]);
    });
  };

  const apiKey = "a310a0e3";

  // const getLatestDetails = async () => {
  //   const { data } = await axios.get(
  //     `http://www.omdbapi.com/?apikey=${apiKey}&s="batman"`
  //   );
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getLatestDetails();
  // }, []);

  useEffect(() => {
    getMovieDetails(pokemonList);
  }, [pokemonList]);

  const pokemonDetails = tempPokemonDetails.slice(0, 500);

  // react paginate

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(pokemonDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pokemonDetails.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, tempPokemonDetails]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pokemonDetails.length;
    setItemOffset(newOffset);
  };

  // search logic

  const dispatchSearchItem = () => {
    if (searchTerm) {
      dispatch(setSearchItem(searchTerm));
    }
  };
  useEffect(() => {
    dispatchSearchItem();
  }, [searchTerm]);

  const filteredList = currentItems.filter((pokemon) => {
    if (searchState && searchTerm) {
      return pokemon.name
        .toLocaleLowerCase()
        .includes(searchState.toLocaleLowerCase());
    } else {
      return pokemon;
    }
  });

  // Conditional rendering

  if (isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading
          color={generalColor}
          height={100}
          width={100}
          type={"spin"}
        />
      </div>
    );
  }
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
          {filteredList.map((pokemon, index) => {
            return <MovieCard {...pokemon} key={index} />;
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
      <SideModal pokemonDetails={pokemonDetails} />
    </>
  );
};

export default ListView;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  movieId: "",
  searchState: "love",
  isModalOpen: false,
};

const ListSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSearchItem: (state, action) => {
      return {
        ...state,
        searchState: action.payload,
      };
    },
    setMovieId: (state, action) => {
      return {
        ...state,
        movieId: action.payload,
      };
    },
    openSideModal: (state, action) => {
      return {
        ...state,
        isModalOpen: true,
      };
    },
    closeSideModal: (state, action) => {
      return {
        ...state,
        isModalOpen: false,
      };
    },
  },
});

const ListReducer = ListSlice.reducer;
export const { setSearchItem, setMovieId, openSideModal, closeSideModal } =
  ListSlice.actions;

export default ListReducer;

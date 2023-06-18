import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getPokemonData = createAsyncThunk(
//   "cart/getPokemonData",
//   async () => {
//     try {
//       const {
//         data: { results },
//       } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=500");
//       return results;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const initialState = {
  movieList: [],
  movieId: "",
  searchState: "",
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
  // extraReducers: (builder) => {
  //   builder.addCase(getPokemonData.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(getPokemonData.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.movieList = action.payload;
  //   });
  //   builder.addCase(getPokemonData.rejected, (state) => {
  //     state.isLoading = false;
  //   });
  // },
});

const ListReducer = ListSlice.reducer;
export const { setSearchItem, setMovieId, openSideModal, closeSideModal } =
  ListSlice.actions;

export default ListReducer;

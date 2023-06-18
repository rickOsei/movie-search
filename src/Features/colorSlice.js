import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalColor: "#DF3939",
  isColoModalOpen: false,
};

const ColorSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setGeneralColor: (state, action) => {
      return {
        ...state,
        generalColor: action.payload,
      };
    },
    openModal: (state, action) => {
      return {
        ...state,
        isColorModalOpen: true,
      };
    },
    closeModal: (state, action) => {
      return {
        ...state,
        isColorModalOpen: false,
      };
    },
  },
});

const ColorReducer = ColorSlice.reducer;
export const { setGeneralColor, openModal, closeModal } = ColorSlice.actions;

export default ColorReducer;
